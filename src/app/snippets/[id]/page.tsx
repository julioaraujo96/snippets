import { notFound, redirect } from 'next/navigation';
import { db } from '@/db';
import Link from 'next/link';
import { deleteSnippet } from '@/actions';
import { ReturnHomeButton } from '@/components/return-home-button';

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  const snippet = await db.snippet.findFirst({
    where: {
      id: Number(props.params.id),
    },
  });

  if (!snippet) {
    return notFound();
  }

  const handleDeleteAction = deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className='flex my-4 justify-between items-center'>
        <h1 className='text-xl font-bold'>{snippet.title}</h1>
        <div className='flex gap-4'>
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className='p-2 px-4 border rounded text-white bg-blue-400'
          >
            Edit
          </Link>
          <form action={handleDeleteAction}>
            <button className='p-2 px-4 border rounded text-white bg-red-400'>
              Delete
            </button>
          </form>
        </div>
      </div>
      <pre className='p-3 border rounded bg-gray-200 border-gray-200'>
        <code>{snippet.code}</code>
      </pre>
      <ReturnHomeButton />
    </div>
  );
}

//quando executamos o build, esta function é chamada automaticamente
export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}
