import AuthNav from '@/components/Auth/AuthNav/AuthNav';
import AllUsersTab from '@/components/Auth/AllUsers/AllUsers';
import BgImageScreensaver from '@/components/Auth/BgImageScreensaver/BgImageScreensaver';
import css from './page.module.css';

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
            <BgImageScreensaver />
          </div>
        </div>
      </div>
    </main>
  );
}
