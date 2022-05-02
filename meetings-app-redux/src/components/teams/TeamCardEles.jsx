import UserEles from "./UserEles";
const TeamCardEles = ({teams,removeTeamHandler,setMemberEmail,users,addNewMember}) =>{
    const teamsEles = teams.map((team) => {
        let membersString = "";
        team.members.forEach((member) => {
            membersString += member.email + ", ";
        });
        return (
            <div
                className="team-box my-2"
                data-team-id={team._id}
                data-testid={team._id}
                key={team._id}
            >
                <h3>{team.name}</h3>

                <div className="my-2">@{team.shortName}</div>
                <div className="grey-font">{team.description} </div>
                <div className="bottom-line-button">
                <button
                    className="btn btn-danger my-3 excuse"
                    onClick={() => removeTeamHandler(team)}
                >
                    Excuse yourself
                </button>
                </div>
                
                <div className="my-2 members-names" id="add-team-member-names">
                    <b>Members:</b>
                    {membersString}
                </div>
                <form encType="multipart/form-data">
                    <label htmlFor="member"></label>
                    <select
                        id="member"
                        name="member"
                        placeholder="select member"
                        className="select-height users"
                        aria-label="select the members you want to add"
                     
                        onChange={(event) => {
                            setMemberEmail(event.target.value);
                        }}
                    >
                        <option value="">Select member</option>
                        <UserEles users={users} />
                    </select>

                    <button
                        type="button"
                        className="btn btn-primary members"
                        id="btn-members"
                        onClick={() => addNewMember(team)}
                    >
                        Add
                    </button>
                </form>
            </div>
        );
    });
    return teamsEles;
}
export default TeamCardEles;