import React from 'react';
import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full cursor-pointer justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:outline-offset-0"
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
