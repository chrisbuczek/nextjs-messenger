'use client';

import Input from '@/app/components/inputs/Input';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isPending, setIsPending] = useState(false);
  //   const initialState: ActionResponse = {
  //     name: null,
  //     email: null,
  //     password: null,
  //   };

  //   this is another way of doing forms (better)
  //   const [state, action, isPending] = useActionState(submitAddress, undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const submitAddress = (e: React.FormEvent<HTMLFormElement>) => {
    // this should be a server action when using useActionState
    e.preventDefault();
    setIsPending(true);

    if (variant === 'REGISTER') {
      // Axios register
    }
    if (variant === 'LOGIN') {
      // NextAuth SignIn
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsPending(true);

    if (variant === 'REGISTER') {
      // Axios Register
    }

    if (variant === 'LOGIN') {
      // NextAuth SignIn
    }
  };

  const socialAction = (action: string) => {
    setIsPending(true);

    // NextAuth Social SignIn
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form
          className="flex flex-col gap-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input />
          <Input />
          <Input />
          <button></button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
