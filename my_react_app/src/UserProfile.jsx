const UserProfile = ({name,age,gender,randomImageNumber,...props})=> {
    gender = gender === "male" ? "men":"women";
    return (
      <div>
        <h1>{name}</h1>
        <p>{age}</p>
        <img src={`https://randomuser.me/api/portraits/${gender}/${randomImageNumber}.jpg`} alt="imagePerson" />
        {props.children}
      </div>
    );
};

export default UserProfile;