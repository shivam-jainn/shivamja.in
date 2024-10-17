import React from 'react';

export default function Page() {
  return (
    <div className='h-full overflow-auto p-8 bg-black text-white'>
      <h1 className='text-6xl font-bold mb-4'>
        Hi, I'm Shivam Jain!
      </h1>
      <p className='text-lg mb-6 text-4xl'>
        I'm a full-stack cloud developer with a passion for designing, developing, and deploying applications. I enjoy working across the entire stack, from creating user interfaces to building reliable backend systems.
      </p>

      {/* My Tech Skills Table */}
      <div className='mt-10'>
        <h2 className='text-4xl font-bold mb-4'>My Tech Stack</h2>

        <table className='w-full text-3xl rounded-lg overflow-hidden shadow-lg'>
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-lg'>Category</th>
              <th className='px-6 py-3 text-left text-lg'>Technologies</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border-t border-gray-600 px-6 py-4'>Frontend & UI/UX</td>
              <td className='border-t border-gray-600 px-6 py-4'>
                <TechBadge name="ReactJS" url="https://reactjs.org" />
                <TechBadge name="Next.js" url="https://nextjs.org" />
                <TechBadge name="TailwindCSS" url="https://tailwindcss.com" />
                <TechBadge name="MUI" url="https://mui.com" />
                <TechBadge name="AntD" url="https://ant.design" />
                <TechBadge name="ShadCN" url="https://shadcn.dev" />
                <TechBadge name="Figma" url="https://figma.com" />
              </td>
            </tr>
            <tr>
              <td className='border-t border-gray-600 px-6 py-4'>Backend</td>
              <td className='border-t border-gray-600 px-6 py-4'>
                <TechBadge name="ExpressJS" url="https://expressjs.com" />
                <TechBadge name="FastAPI" url="https://fastapi.tiangolo.com" />
                <TechBadge name="Django" url="https://www.djangoproject.com" />
                <TechBadge name="Flask" url="https://flask.palletsprojects.com" />
                <TechBadge name="Docker" url="https://docker.com" />
                <TechBadge name="REST API" url="https://restfulapi.net" />
              </td>
            </tr>
            <tr>
              <td className='border-t border-gray-600 px-6 py-4'>Databases & ORM</td>
              <td className='border-t border-gray-600 px-6 py-4'>
                <TechBadge name="Chroma Vector DB" url="https://www.trychroma.com/" />
                <TechBadge name="MongoDB" url="https://www.mongodb.com" />
                <TechBadge name="Pinecone" url="https://www.pinecone.io" />
                <TechBadge name="PostgreSQL" url="https://www.postgresql.org" />
                <TechBadge name="Prisma" url="https://www.prisma.io" />
                <TechBadge name="Mongoose" url="https://mongoosejs.com" />
              </td>
            </tr>
            <tr>
              <td className='border-t border-gray-600 px-6 py-4'>IAAC & Cloud</td>
              <td className='border-t border-gray-600 px-6 py-4'>
                <TechBadge name="Jenkins" url="https://www.jenkins.io" />
                <TechBadge name="Kubernetes" url="https://kubernetes.io" />
                <TechBadge name="Ansible" url="https://www.ansible.com" />
                <TechBadge name="Bamboo" url="https://www.atlassian.com/software/bamboo" />
                <TechBadge name="Bitbucket" url="https://bitbucket.org" />
                <TechBadge name="GitHub" url="https://github.com" />
                <TechBadge name="Terraform" url="https://www.terraform.io" />
                <TechBadge name="AWS S3" url="https://aws.amazon.com/s3" />
                <TechBadge name="AWS EC2" url="https://aws.amazon.com/ec2" />
                <TechBadge name="AWS Lambda" url="https://aws.amazon.com/lambda" />
              </td>
            </tr>
            <tr>
              <td className='border-t border-gray-600 px-6 py-4'>Testing</td>
              <td className='border-t border-gray-600 px-6 py-4'>
                <TechBadge name="Playwright" url="https://playwright.dev" />
                <TechBadge name="Jest" url="https://jestjs.io" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Badge Component with Links
function TechBadge({ name, url }: { name: string; url: string }) {
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className='inline-block m-2 px-3 py-1 rounded-full text-sm font-semibold border border-white transition-all hover:bg-white hover:text-black'
    >
      {name}
    </a>
  );
}
