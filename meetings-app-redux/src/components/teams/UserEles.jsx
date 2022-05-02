const UserEles = ({users}) =>{
    const usersEles = users.map((user) => {
        return (
            <option value={user.email} key={user._id} userid={user._id}>
                {" "}
                {user.email}
            </option>
        );
    });
    return usersEles
}

export default UserEles