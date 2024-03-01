import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoginForm from '@/components/login/LoginForm';
import Link from 'next/link';
import { handleGithubLogin, handleGoogleLogin } from '@/lib/action';

const Login = () => {
  return (
    <main className="flex flex-col items-center">
      <section className="w-[90%] flex flex-col gap-[75px]">
        <article className="flex flex-col gap-6">
          <h1 className="text-[3rem] font-bold text-center">Welcome back</h1>
          <p className="text-[1.5rem] text-center">
            Lorem ipsum dolor sit amet, consectetur adip sicing elit, sed do eiusmod.
          </p>
        </article>
        <article>
          <form className="mb-8" action={handleGithubLogin}>
            <button className="border-2 w-full p-4 rounded-[25px] text-[1.5rem] flex items-center justify-center gap-8 cursor-pointer">
              <FontAwesomeIcon icon={faGithub} className="h-16" />
              <div>
                <span>Login with Github</span>
              </div>
            </button>
          </form>
          <form action={handleGoogleLogin}>
            <button className="border-2 w-full p-4 rounded-[25px] text-[1.5rem] flex items-center justify-center gap-8 cursor-pointer">
              <FontAwesomeIcon icon={faGoogle} className="h-16" />
              <span>Login with Google</span>
            </button>
          </form>
          <div className="text-center text-[1.5rem] mt-4 mb-4 flex justify-between items-center">
            <hr className="w-12 h-[2px] bg-black " />
            <span>OR WITH EMAIL AND PASSWORD</span>
            <hr className="w-12 h-[2px] bg-black " />
          </div>
          <LoginForm />
        </article>
        <article className="fixed bottom-20 text-[1.5rem] inset-x-0 max-w-max mx-auto">
          <p>
            Don’t have any account?{' '}
            <Link href="/register" className="text-linkColor font-bold">
              {' '}
              Sign up
            </Link>
          </p>
        </article>
      </section>
    </main>
  );
};

export default Login;
