'use client';

import { createSnippet } from '@/actions';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';

export default function SnippetCreatePage() {
  const [formState, action] = useFormState(createSnippet, { message: '' });
  const router = useRouter();

  const handleRedirectHome = () => {
    router.push('/');
  };
  return (
    <form action={action}>
      <h3 className='font-bold my-3'>Create a Snippet</h3>
      <div className='flex flex-col gap-4 py-3'>
        <div className='flex gap-4'>
          <label htmlFor='title' className='w-12'>
            Title
          </label>
          <input
            name='title'
            id='title'
            className='border rounded p-2 w-full'
          />
        </div>
        <div className='flex gap-4'>
          <label htmlFor='code' className='w-12'>
            Code
          </label>
          <textarea
            name='code'
            id='code'
            className='border rounded p-2 w-full'
          />
        </div>
        {formState.message ? (
          <div className='my-2 p-2 bg-red-200 border rounded border-red-400'>
            {formState.message}
          </div>
        ) : null}

        <button
          type='submit'
          className='rounded p-2 text-white bg-blue-400 my-2'
        >
          Create
        </button>
      </div>
      <div className='flex w-full justify-end'>
        <button className='p-2 border rounded' onClick={handleRedirectHome}>
          Go back
        </button>
      </div>
    </form>
  );
}
