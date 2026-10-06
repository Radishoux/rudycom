import { profile, projects, skillGroups } from '../src/data/profile';
import { resolve } from 'path';

const root = resolve(import.meta.dir, '..');
const output = resolve(root, 'public', profile.cvFilename);
const result = Bun.spawnSync({
  cmd: [process.env.CV_PYTHON || 'python', resolve(root, 'scripts/render-cv.py'),
    output],
  stdin: Buffer.from(JSON.stringify({ profile, projects: projects.filter((project) => project.cv), skillGroups })),
  stdout: 'inherit',
  stderr: 'inherit',
  cwd: root,
});
if (result.error) throw result.error;
if (result.exitCode === 0) {
  // Preserve links shared before the full-name update.
  await Bun.write(resolve(root, 'public/Rudy_Quinternet_Software_Engineer_CV.pdf'), Bun.file(output));
}
process.exit(result.exitCode);
