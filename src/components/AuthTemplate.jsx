import RightImg from '/assets/RightImg.png'

function AuthTemplate() {
    const myCustomColor = '#3DA5EC';

  return (
    <div className="overflow-hidden h-[40%] lg:h-screen flex">

      <div className="lg:block hidden lg:bg-slate-100 mb-4 h-screen w-1/2  flex-1 items-center justify-center ">
        
      </div>

      <div className="mb-4 h-[140%] lg:h-screen flex-1 w-1/2 overflow-hidden" style={{ backgroundColor: myCustomColor }}>
        <img src={RightImg} className='relative my-60 left-54 mx-14 lg:block hidden'/>
      </div>

  </div>
  )
}

export default AuthTemplate