import { db } from '@/db';
import Link from 'next/link';

//default uses server component
export default async function Home() {
  //access directly database when no external API
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        className='flex justify-between items-center p-2 border rounded'
        href={`snippets/${snippet.id}`}
      >
        <div>{snippet.title}</div>
        <div>View</div>
      </Link>
    );
  });
  return (
    <div>
      <div className='flex my-4 justify-between items-center'>
        <h1 className='text-xl font-bold'>Snippets</h1>
        <Link
          className='border p-2 px-4 rounded text-white bg-blue-400'
          href='/snippets/new'
        >
          New
        </Link>
      </div>
      <div className='flex flex-col gap-2'>{renderedSnippets}</div>
    </div>
  );
}
