import UpdateClient from '@/components/dashboard/client/UpdateClient';

const page = async({ params }) => {
  const {id} = await params;
    return (
        <div>
          <UpdateClient clientId={id} />
        </div>
    );
};

export default page;