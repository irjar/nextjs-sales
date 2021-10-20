function UserProfilePage(props){
    return<p>{props.username}</p>
}

export default UserProfilePage;

export async function getServerSideProps(context){
    const {params, req, res} = context;

    return{
        props: {
            username: 'Max'
        }
    };
}