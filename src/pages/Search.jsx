import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CgZoomIn } from "react-icons/cg";

function Search() {
    const params = useParams()
    const [data, setData] = useState([]);

    const getAllImage = async () => {
        try {
            const { data } = await axios.get(`https://pixabay.com/api/?key=43534895-e1d7ac335ff96fb5c4200c7c5&q=${params.image}&image_type=photo`);
            setData(data.hits)
            console.log(data.hits)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllImage();
    }, [])

    return (
        <div>

            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-5 justify-center items-center mx-5'>
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

export default Search