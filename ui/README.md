# Internal Tools

## :book: Table of Contents

1. [Introduction](#introduction)
1. [Getting Started](#getting-started)
2. [File Structure](#file-structure)
3. [Technologies](#technologies)<br />
   - [Vercel](#vercel)<br />
   - [Learn Next.js](#learn_next.js)

## :joy: Introduction

The Internal Tools contains internal tools that HackBeanpot Core members use. This project contains the following tools: 

- **Signature maker** 
    > generates email signatures for core members including name, title, phone and email
- **Email sender**: 
    > Parses a CSV with the list of senders and other dynamic fields. The application also reads in a message and replaces general fields with the respective ones from the CSV.

## :zany_face: Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/HackBeanpot/internal-tools.git
```

2. **Change directories**

```bash
cd internal-tools
```

4. **Install the packages**

```bash
# In the project directory
yarn install
```

5. **Run the server locally**

```bash
yarn dev
```

Now the server will run locally, most likely on `http://localhost:3000`. Your work will be displayed, and as changes are saved it will auto-refresh the site.

## :file_folder: File Structure

A quick look at the top-level file structure used

    .
    ├── /.vscode
    ├── /lib
    ├── /node_modules
    ├── /pages
    ├── /pageStyles
    ├── /public
    ├── /styles
    ├── .gitignore
    ├── package.json
    ├── yarn-lock.json
    ├── tsconfig.json
    └── README.md


1.  **`/.vscode`**: This directory contains VSCode configurations like automatically fixing ESLint syntax on save.

2.  **`/lib`**: This directory contains files with shared information such as types.

3.  **`/node_modules`**: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

4.  **`/pages`**: This directory contains all of the pages in the project.

5.  **`/pageStyles`**: This directory contains the styling for all of the pages.

6.  **`/public`**: This directory is used by Next.js to statically serve files.

7.  **`/styles`**: This directory contains the global styles utilized in the project.

8.  **`.gitignore`**: This file tells git which files will not maintain a version history, thus don't need to be tracked.

9. **`package.json`**: A manifest file for Node.js projects, this file includes the metadata for the project. Metadat incluedes the project's name, author, etc. This manifest is how yarn knows which packages to isntall to run the project.

10. **`yarn-lock.json`**: (First see `package.json`, below) This is an automatically generated file based on the exact versions of your yarn dependencies used for the project. **You won't change this file directly.**

11.  **`tsconfig.json`**: This directory contains cross-project reusable styling.

12. **`README.md`**: A reference text file containing information about the project.

## :gear: Technologies

The website is built on the following technologies:

- [Vercel](https://vercel.com/): Site hosting provider
- [Next.js](https://nextjs.org/): Static site generator for the site

### :diamond_shape_with_a_dot_inside: Vercel

The Internal Tools site is deployed on [Vercel](https://vercel.com/). Vercel is continuous integration and deployment platform that allows you to run web projects at global scale. There are a couple ways to update and deploy the site:

- **Manual Deploy**: Go to [https://vercel.com/hackbeanpot/internal-tools/deployments](https://vercel.com/hackbeanpot/internal-tools/deployments). Click on **Redploy** for a specific preview. Now the build will begin for your site. If your build is successful, the logs will tell you that the site is live! If any errors arise in the logs, please fix them and redeploy.

- **Merging a Pull Request**: Vercel is hooked up to GitHub, thus when a PR is merged into the master branch Vercel will automaticaly deploy to keep the site up-to-date.
  Note: Upon creating and updating any Pr, a `deploy preview` can be accessed from the bottom of the page - this

Note: In Vercel, when a PR is created there is a link, **Deploy Preview ##**, that will allow you to preview the changes.

### :zap: Learn NextJS

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!