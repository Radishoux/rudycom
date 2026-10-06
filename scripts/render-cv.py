"""Render the public CV from the same content as the website. No duplicated copy."""

import json
import sys
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import HRFlowable, KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
from pypdf import PdfReader


data = json.load(sys.stdin)
profile = data['profile']
output = Path(sys.argv[1])
output.parent.mkdir(parents=True, exist_ok=True)

ink = colors.HexColor('#202533')
muted = colors.HexColor('#51596A')
accent = colors.HexColor('#654179')
line = colors.HexColor('#DCD6E1')
styles = {
    'name': ParagraphStyle('name', fontName='Helvetica-Bold', fontSize=25, leading=29, textColor=ink, spaceAfter=3),
    'role': ParagraphStyle('role', fontName='Helvetica', fontSize=11.5, leading=15, textColor=accent, spaceAfter=5),
    'contact': ParagraphStyle('contact', fontName='Helvetica', fontSize=8.5, leading=11.5, textColor=muted),
    'section': ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=9.5, leading=12, textColor=accent, spaceBefore=8, spaceAfter=4, keepWithNext=True),
    'body': ParagraphStyle('body', fontName='Helvetica', fontSize=9.5, leading=12, textColor=ink, spaceAfter=3),
    'title': ParagraphStyle('title', fontName='Helvetica-Bold', fontSize=10, leading=12.5, textColor=ink),
    'date': ParagraphStyle('date', fontName='Helvetica', fontSize=8.5, leading=11, textColor=muted, alignment=TA_RIGHT),
    'context': ParagraphStyle('context', fontName='Helvetica', fontSize=8.5, leading=11, textColor=muted, spaceAfter=2),
    'bullet': ParagraphStyle('bullet', fontName='Helvetica', fontSize=9.5, leading=12, textColor=ink, leftIndent=9, firstLineIndent=-9, spaceAfter=2),
}


def p(text, style='body'):
    return Paragraph(escape(text), styles[style])


def link(label, url):
    return f'<a href="{escape(url)}" color="#51596A">{escape(label)}</a>'


def section(title):
    return p(title.upper(), 'section')


def heading(title, period):
    # A long period is placed on its own line to keep the role legible.
    if len(period) > 30:
        return [p(title, 'title'), p(period, 'context')]
    table = Table([[p(title, 'title'), p(period, 'date')]], colWidths=[408, 103], hAlign='LEFT')
    table.setStyle(TableStyle([('VALIGN', (0, 0), (-1, -1), 'TOP'),
                              ('LEFTPADDING', (0, 0), (-1, -1), 0),
                              ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                              ('TOPPADDING', (0, 0), (-1, -1), 0),
                              ('BOTTOMPADDING', (0, 0), (-1, -1), 0)]))
    return [table]


story = [p(profile['name'], 'name'), p(f"{profile['role']} | {profile['specialism']}", 'role')]
story.append(p(f"{profile['location']} | {profile['availability']} | EU citizen, no sponsorship required", 'contact'))
contacts = [link(profile['email'], f"mailto:{profile['email']}"),
            link(profile['phone'], 'tel:' + profile['phone'].replace(' ', '')),
            link('radishoux.github.io/rudycom', profile['website'])]
story.append(Paragraph(' | '.join(contacts), styles['contact']))
story.append(Paragraph(' | '.join([link('github.com/Radishoux', profile['github']),
                                 link('linkedin.com/in/rudy-quinternet', profile['linkedin'])]), styles['contact']))
story.extend([Spacer(1, 8), HRFlowable(width='100%', thickness=0.8, color=line),
              section('Profile'), p(profile['summary']), section('Experience')])

for item in profile['experience']:
    entry = heading(f"{item['company']} | {item['role']}", item['period'])
    entry.append(p(item['context'], 'context'))
    entry.extend(p('- ' + bullet, 'bullet') for bullet in item['bullets'])
    entry.append(Spacer(1, 2))
    story.append(KeepTogether(entry))

story.append(section('Technology experience'))
for group in data['skillGroups']:
    story.append(Paragraph(f"<b>{escape(group['title'])}:</b> {escape(', '.join(group['items']))}", styles['body']))

story.append(section('Selected personal project'))
for project in data['projects']:
    story.extend([p(project['name'] + ' | AI-assisted development', 'title'),
                  p(project['description'] + ' ' + project['impact'])])

story.append(section('Education & languages'))
for item in profile['education'] + profile['certifications']:
    story.append(Paragraph(f"<b>{escape(item['title'])}</b> | {escape(item['institution'])} | {escape(item['year'])}", styles['body']))
story.append(p(' | '.join(f"{x['name']}: {x['level'].lower()}" for x in profile['languages'])))

doc = SimpleDocTemplate(str(output), pagesize=A4, rightMargin=36, leftMargin=36,
                        topMargin=30, bottomMargin=27, title=f"{profile['name']} - {profile['role']}",
                        author=profile['name'], subject='Career, technical experience and selected personal project',
                        invariant=1, pageCompression=1)
doc.build(story)

# Catch stale/missing content and accidental overflow before the site is built.
reader = PdfReader(output)
if len(reader.pages) != 1:
    raise ValueError(f'CV must fit one page; got {len(reader.pages)}. Review the layout before publishing.')
text = ' '.join(reader.pages[0].extract_text().split())
required = [profile['name'], profile['role'], profile['summary'], profile['email'], profile['phone']]
for item in profile['experience']:
    required.extend([item['company'], item['role'], item['period'], item['context'], *item['bullets']])
for group in data['skillGroups']:
    required.extend([group['title'], ', '.join(group['items'])])
for project in data['projects']:
    required.extend([project['name'], project['description'], project['impact']])
for item in profile['education'] + profile['certifications']:
    required.extend([item['title'], item['institution'], item['year']])
for language in profile['languages']:
    required.append(f"{language['name']}: {language['level'].lower()}")
for value in required:
    if ' '.join(value.split()) not in text:
        raise ValueError(f'Content missing from PDF: {value}')
links = [annotation.get_object().get('/A', {}).get('/URI') for annotation in reader.pages[0].get('/Annots', [])]
for url in [profile['website'], profile['github'], profile['linkedin'], f"mailto:{profile['email']}"]:
    if url not in links:
        raise ValueError(f'Clickable link missing from PDF: {url}')
print('Verified: one page, shared career content and clickable contact links.')
print(f'Generated {output}')
