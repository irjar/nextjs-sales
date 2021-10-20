function UserIdPage(props){
 return<p>{props.id}</p>
}

export default UserIdPage;

export async function getServerSideProps(context){
    const { params } = context;
    const userId = params.uid;

    return{
      props: {
          id: 'user Id - ' + userId
        },
    };
}