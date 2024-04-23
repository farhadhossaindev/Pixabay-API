import React, { useEffect, useState } from 'react';
import bannerImg from '../assets/banner.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CgZoomIn } from "react-icons/cg";

function Home() {
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [data, setData] = useState([]);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hours, setHours] = useState(0);
  const [day, setDay] = useState(0);

  //----------------Timer-------------------------
  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      setSec(sec + 1);
      if (sec === 59) {
        setMin(min + 1);
        setSec(0);
      }
      if (min === 59) {
        setHours(hours + 1);
        setMin(0);
      }
      if (hours === 24) {
        setDay(day + 1);
        setHours(0);
      }
    }, 1000)
    return () => clearInterval(timer);

  })



  //--------------- Api fetch------------------------------------
  const getAllImage = async () => {
    try {
      const { data } = await axios.get(`https://pixabay.com/api/?key=43534895-e1d7ac335ff96fb5c4200c7c5&q=image&image_type=photo`);
      setData(data.hits);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllImage();
  }, []);







  return (
    <div>
      {/*-------------------- Image Search Section--------------------------- */}
      <div className='flex justify-center items-center'>
        <div className='flex px-5 mt-3 md:w-[50%] w-[100%] absolute'>
          <input type="text" onChange={(e) => setImage(e.target.value)} placeholder="Search Here" className="input input-bordered w-full rounded-none  font-normal" style={{ outline: 'none' }} />
          <button className="w-[40%] rounded-none text-[16px] bg-black text-white" onClick={() => image && navigate(`/search/${image}`)}>Search</button>
        </div>
        <img className='w-full h-[250px] object-cover bg-no-repeat' src={bannerImg} alt="" />
      </div>


      {/*-------------------------------- Coundown----------------------------- */}
      <div className='flex justify-center items-center my-5'>
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              {day}
            </span>
            days
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              {hours}
            </span>
            hours
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              {min}
            </span>
            min
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              {sec}
            </span>
            sec
          </div>
        </div>
      </div>

      {/* ---------------------Image Card ------------------------------------------*/}

      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-5 justify-center items-center mx-3 '>
        {data &&
          data.map((data) => (
            <div key={data.id}>
              <div className="relative cursor-pointer flex justify-center items-center">
                <img className='w-full h-full rounded' src={data.previewURL} alt={data.user} />
                <div className="absolute w-full h-full bg-black opacity-0 transition-opacity duration-300 hover:opacity-70"></div>

                {/* Open the modal */}
                <button onClick={() => document.getElementById(`modal_${data.id}`).showModal()} className='absolute bg-[#67C1C7] py-2 px-2 rounded-full right-3 bottom-3 text-xl z-50'><CgZoomIn /></button>
                {/* Modal */}
                <dialog id={`modal_${data.id}`} className="modal">
                  <div className="modal-box m-0 p-0">
                    <img className='w-full h-full' src={data.previewURL} alt={data.user} />
                    <div className='flex justify-around'>
                      <p className=" text-center text-xl mt-2"> Image width {data.imageWidth}</p>
                      <p className=" text-center text-xl mt-2"> Image Height {data.imageHeight}</p>
                    </div>
                    <p className=" text-center text-xl mt-2 pb-5"> Image Height {data.tags}</p>
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home;
