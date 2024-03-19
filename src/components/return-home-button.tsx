import { handleRedirectHome } from '@/actions';

export function ReturnHomeButton() {
  return (
    <form action={handleRedirectHome} className='flex w-full justify-end'>
      <button type='submit' className='my-4 p-2 border rounded'>
        Go back
      </button>
    </form>
  );
}
