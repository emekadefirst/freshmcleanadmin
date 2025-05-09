import CleanersDbTemp from "./CleanersDbTemp";

function CleanersHome() {
  return (
    <>
      <div>
        <CleanersDbTemp
          InitNav={true}
          Color3="#3DA5EC"
          tempColor3="white"
          ValueInText3={75}
          NavText="Piers morgan"
          WelcomeText="Welcome"
          showAdditionalDiv1={true}
        />
        <div></div>
      </div>
    </>
  );
}

export default CleanersHome;
