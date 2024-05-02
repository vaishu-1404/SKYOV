'use client';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import Input from '../Input/Input';
import { toast } from 'react-hot-toast';
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form';
import useRegisterModel from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import { error } from 'console';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import LoginModal from './LoginModal';
import useLoginModal from '@/app/hooks/useLoginModel';

const RegisterModel = () => {
  const RegisterModal = useRegisterModel();
  const LoginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
      .then(() => {
        RegisterModal.onClose();
      })
      .catch((error) => {
        toast.error('Something Went Wrong');
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  const onToggle = useCallback(() => {
    RegisterModal.onClose();
    LoginModal.onOpen();
  }, [LoginModal, RegisterModal])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title="Welcome to skyov"
        subtitle="Create an account!"
      />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        type='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')} />

      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')} />
      <div className='
      text-neutral-500
      text-center
      mt-4
      font-light'>
        <div className='justify-center flex flex-row items-center gap-2'>
          <div>
            Already have an account?
          </div>
          <div onClick={onToggle}
            className='
      text-neutral-800
      cursor-pointer
      hover:underline'>
            Log in
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <Modal
      disabled={isLoading}
      isOpen={RegisterModal.isOpen}
      title='Register'
      actionLabel='Continue'
      onClose={RegisterModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModel;
