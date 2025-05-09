import DashboardTemp from './DashboardTemp'

function PendingRequest() {
  return (
    <>
        <div>
            <DashboardTemp AltNav={true} Color1='#3DA5EC' tempColor1='white' ValueInText1={75} NavText="Cleaning Requests" showAdditionalDiv2={true}/>
            <div>
            </div>
      </div>
    </>
  )
}

export default PendingRequest
