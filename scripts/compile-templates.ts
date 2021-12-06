import fs from 'fs';
import { compileTemplate } from 'logicful-templates';
import path from 'path';
import rimraf from 'rimraf';

/**
 * The path to where we'll emit the compiled HTML
 */
const distPath = path.resolve(__dirname, '../dist');

const isExistingFileOrFolder = (targetPath: string) => {
  return new Promise((resolve, reject) => {
    fs.stat(targetPath, (error) => {
      if (!error) {
        resolve(true);
      } else if (error.code === 'ENOENT') {
        resolve(false);
      } else {
        reject(error);
      }
    });
  });
};

const writeFile = (targetPath: string, contents: string) => {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(targetPath, contents, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const createFolder = async (targetPath: string) => {
  const isExistingFolder = await isExistingFileOrFolder(targetPath);

  if (!isExistingFolder) {
    return new Promise<void>((resolve, reject) => {
      fs.mkdir(targetPath, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
};

const deleteFolder = async (targetPath: string) => {
  const isExistingFolder = await isExistingFileOrFolder(targetPath);

  if (isExistingFolder) {
    return new Promise<void>((resolve, reject) => {
      rimraf(targetPath, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }
};

const cleanFolder = async (targetPath: string) => {
  const isExistingFolder = await isExistingFileOrFolder(targetPath);

  if (isExistingFolder) {
    await deleteFolder(targetPath);
    await createFolder(targetPath);
  } else {
    await createFolder(targetPath);
  }
};

const compileTemplates = async () => {
  // An array of paths pointing to your "raw" TSX files
  const paths = [path.resolve(__dirname, '..', 'templates', 'index.tsx')];

  for (let i = 0; i < paths.length; i++) {
    const currentPath = paths[i];
    const isExistingFile = await isExistingFileOrFolder(currentPath);

    if (!isExistingFile) {
      console.warn('Could not find file at: ' + currentPath);
      continue;
    }

    const module = await import(currentPath);

    if (!module.default) {
      console.warn('Could not find default export in: ' + currentPath);
      continue;
    }

    const htmlContents = compileTemplate(() => module.default(), { pretty: true });
    const htmlFileName = `${path.parse(path.basename(currentPath)).name}.html`;
    const htmlOutputPath = path.resolve(distPath, htmlFileName);

    await writeFile(htmlOutputPath, htmlContents);
    console.log('Wrote ' + htmlOutputPath);
  }
};

const run = async () => {
  await cleanFolder(distPath);
  console.log('Cleaned ' + distPath);

  await compileTemplates();
  console.log('Finished compiling templates');
};

run();
