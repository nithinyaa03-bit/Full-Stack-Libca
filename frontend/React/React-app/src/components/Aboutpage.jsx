import { useState, useEffect } from 'react';
import hicas from '../assets/hicas.png';
import libca1 from '../assets/libca1.jpg';
import image from '../assets/image.jpeg';
import image2 from '../assets/image2.jpeg';
const Aboutpage = () =>
{
    const images = [hicas, libca1, image, image2];
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, [images.length]);

    return(
         <div className="min-h-screen px-6 py-12 bg-[#FFFBEB]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
            <h2 className="text-2xl font-semibold mb-4 text-[#451A03]">About the Department</h2><p className="text-[#78350F] mt-2"> The course in our curriculum is designed to help students achieve specific learning objectives to acquire the up-to-date technical knowledge and develop the skills needed for a successful start to careers in the computing industry. The Department is sanctioned with DBT Star college scheme of the Ministry of human resource and development, New Delhi. Domain- based training framework is adopted for final-year student projects. Our students and faculty are motivated to attend various seminars, workshops, webinars, internships and skill certification to constantly upgrade the industry trends. Many intellectual prototype models created and exhibited by our BCA students are well appreciated by industry experts and Media People. The Department of Computer Applications <b>(BCA)</b> has laid a strong foundation to elevate excellence in academics through learning-by-doing?? motto9.The Department is also maintaining a Separate Library for our faculties and students.</p>
            <h2 className="text-2xl font-semibold mb-4 text-[#451A03]">vision</h2>
            <p className="text-[#78350F] mt-2">To provide intellectual environment that fosters the search for new knowledge in a highly dynamic computing world and to fine tune graduate research attributes and inculcate research interest among the students to pursue higher education.</p>
            <h2 className="text-2xl font-semibold mb-4 text-[#451A03]">Mission</h2>
               <p className="text-[#78350F] mt-2"> To provide an excellent education in all computers related fields.To impart computer education and generat acquaintance to the students for global competence and excellence in quality.</p>
            </div>
              <div className="flex justify-center">
              <img src={images[currentImage]} alt="department" className="rounded-xl shadow-lg w-full max-w-md"/>
            </div>
            </div>
            </div>
    )
}
export default Aboutpage;