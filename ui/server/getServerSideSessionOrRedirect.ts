import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

export const getServerSideSessionOrRedirect: GetServerSideProps = async (
  ctx
) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return { props: { session } };
};