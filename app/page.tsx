import AuthNav from '@/components/Auth/AuthNav/AuthNav';
import AllUsersTab from '@/components/Auth/AllUsers/AllUsers';
import heroPhone from '@/public/img/Rectangle1xphone.png';
import heroTab from '@/public/img/Rectangle1xtab.png';
import heroDesk from '@/public/img/Rectangle1xdesk.png';
import css from './page.module.css';
import Image from 'next/image';
import DecorativeTab from '@/components/Auth/DecorationTab/DecorationTab';

export default function HomePage() {
  return (
    <main>
      <div className="container">
        <div className={css.deskContainer}>
          <div className={css.content}>
            <p className={css.log}> EXPENSE LOG</p>
            <h1 className={css.title}>
              Manage Your <span className={css.accent}>Finances</span>{' '}
              Masterfully!
            </h1>
            <p className={css.description}>
              ExpenseTracker effortlessly empowers you to take control of your
              finances! With intuitive features, it simplifies the process of
              tracking and managing expenses, allowing for a stress-free mastery
              over your financial world.
            </p>
            <AuthNav />
            <AllUsersTab />
          </div>

          <div className={css.bgImage}>
            <picture>
              <source srcSet={heroDesk.src} media="(min-width: 1440px)" />
              <source srcSet={heroTab.src} media="(min-width: 768px)" />
              <Image
                src={heroPhone}
                alt="Hero Image"
                style={{ width: '100%', height: 'auto' }}
              />
            </picture>
            <div className={css.decorativeWrapper}>
              <DecorativeTab />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
