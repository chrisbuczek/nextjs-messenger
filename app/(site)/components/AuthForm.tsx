'use client';

import axios from 'axios';
import Button from '@/app/components/Button';
import Input from '@/app/components/inputs/Input';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isPending, setIsPending] = useState(false);

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsPending(true);

    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .catch(() => toast.error('Something went wrong!'))
        .finally(() => setIsPending(false));
    } else {
      toast.error(
        'Sign in with credentials not possible now. Use Github or Google account to login',
      );
    }

    // if (variant === 'LOGIN') {
    //   console.log('Login', data);
    //   signIn('credentials', {
    //     redirect: false,
    //     ...data,
    //   })
    //     .then((callback) => {
    //       console.log(callback);
    //       if (callback?.error) {
    //         toast.error('Invalid credentials');
    //       }

    //       if (callback?.ok && !callback?.error) {
    //         toast.success('Logged in');
    //       }
    //     })
    //     .finally(() => setIsPending(false));
    // }
  };

  const socialAction = async (action: string) => {
    setIsPending(true);
    await signIn(action);

    // await signIn(action, { redirect: false })
    //   .then((callback) => {
    //     if (callback?.error) {
    //       toast.error('Invalid Credentials');
    //     }

    //     if (callback?.ok && !callback?.error) {
    //       toast.success('Logged in!');
    //     }
    //   })
    //   .finally(() => setIsPending(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form
          className="flex flex-col gap-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {variant === 'REGISTER' && (
            <Input
              id="name"
              label="Name"
              register={register}
              errors={errors}
              disabled={isPending}
            />
          )}
          <Input
            id="email"
            label="Email address"
            type="email"
            register={register}
            errors={errors}
            disabled={isPending}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            disabled={isPending}
          />
          <div>
            <Button disabled={isPending} fullWidth type="submit">
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>

          <div className="mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500">
            <div>
              {variant === 'LOGIN'
                ? 'New to messenger?'
                : 'Already have an account?'}
            </div>
            <div onClick={toggleVariant} className="cursor-pointer underline">
              {variant === 'LOGIN' ? 'Create an account' : 'Login'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
