import Image from 'next/image';
import AuthForm from './components/AuthForm';
export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-gray-100 justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          alt="logo"
          width={48}
          height={48}
          className="mx-auto w-auto" //w-auto does nothing here
          src={'/images/logo.png'}
        />
        <h2 className="mt-3 text-center text-3xl font-bold tracking-tight text-gray-800">
          Sign in to your account
        </h2>
      </div>
      <AuthForm />
    </div>
  );
}
