import { profile, projects, skillGroups } from '../src/data/profile';
import { resolve } from 'path';

const root = resolve(import.meta.dir, '..');
const result = Bun.spawnSync({
  cmd: [process.env.CV_PYTHON || 'python', resolve(root, 'scripts/render-cv.py'),
    resolve(root, 'public/Rudy_Quinternet_Software_Engineer_CV.pdf')],
  stdin: Buffer.from(JSON.stringify({ profile, projects: projects.filter((project) => project.cv), skillGroups })),
  stdout: 'inherit',
  stderr: 'inherit',
  cwd: root,
});
if (result.error) throw result.error;
process.exit(result.exitCode);
