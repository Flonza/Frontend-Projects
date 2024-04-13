

export const OptionsTypes = {
    plus:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    ,
    minus: 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
    ,
    full: 
        <svg className="w-10 h-10" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M40.5,5.5H7.5a2,2,0,0,0-2,2v33a2,2,0,0,0,2,2h33a2,2,0,0,0,2-2V7.5A2,2,0,0,0,40.5,5.5Z"/>
        </svg>
    ,
    zigzag: 
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100" className="w-10 h-10">
        <polygon points="23,5.53 40.47,23 41,23.53 41.53,23 59,5.53 76.47,23 77,23.53 77.53,23 95.53,5 95,4.47 77,22.47 59.53,5 59,4.47   58.47,5 41,22.47 23.53,5 23,4.47 22.47,5 4.47,23 5,23.53 "/>
        <polygon points="77,39.87 59.53,22.4 59,21.87 58.47,22.4 41,39.87 23.53,22.4 23,21.87 22.47,22.4 4.47,40.4 5,40.93 23,22.93   40.47,40.4 41,40.93 41.53,40.4 59,22.93 76.47,40.4 77,40.93 77.53,40.4 95.53,22.4 95,21.87 "/>
        <polygon points="77,58.469 59.53,41 59,40.47 58.47,41 41,58.47 23.53,41 23,40.47 22.47,41 4.47,59 5,59.53 23,41.53 40.47,59   41,59.53 41.53,59 59,41.53 76.734,59.266 77,59.53 77.53,59 95.53,41 95,40.47 "/>
        <polygon points="77,75.869 59.266,58.135 59,57.87 58.47,58.4 41,75.87 23.53,58.4 23,57.87 22.47,58.4 4.47,76.4 5,76.931   23,58.931 40.47,76.4 41,76.931 59,58.932 76.734,76.666 77,76.931 95.266,58.666 95.53,58.4 95,57.87 "/>
        <polygon points="77,94.469 59.266,76.734 59,76.47 58.47,77 41,94.47 23.53,77 23,76.47 22.47,77 4.47,95 5,95.53 23,77.53   40.47,95 41,95.53 59,77.531 76.734,95.266 77,95.53 95.266,77.266 95.53,77 95,76.47 "/>
    </svg>
    ,
    dots: 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-10 h-10">
            <path d="M6,8A2,2,0,1,1,8,6,2,2,0,0,1,6,8Zm0,9a1,1,0,1,0,1,1A1,1,0,0,0,6,17ZM6,29a1,1,0,1,0,1,1A1,1,0,0,0,6,29ZM8,42a2,2,0,1,0-2,2A2,2,0,0,0,8,42ZM18,4a2,2,0,1,0,2,2A2,2,0,0,0,18,4Zm1,14a1,1,0,1,0-1,1A1,1,0,0,0,19,18Zm1,12a2,2,0,1,0-2,2A2,2,0,0,0,20,30ZM17,42a1,1,0,1,0,1-1A1,1,0,0,0,17,42ZM31,6a1,1,0,1,0-1,1A1,1,0,0,0,31,6ZM30,16a2,2,0,1,0,2,2A2,2,0,0,0,30,16Zm1,14a1,1,0,1,0-1,1A1,1,0,0,0,31,30ZM28,42a2,2,0,1,0,2-2A2,2,0,0,0,28,42ZM42,4a2,2,0,1,0,2,2A2,2,0,0,0,42,4Zm1,14a1,1,0,1,0-1,1A1,1,0,0,0,43,18ZM42,28a2,2,0,1,0,2,2A2,2,0,0,0,42,28Zm0,13a1,1,0,1,0,1,1A1,1,0,0,0,42,41Z"/>
        </svg>
    ,
    crossed: 
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100" className="w-10 h-10">
            <path d="M95,33.9c-1-0.5-1.9-0.9-2.7-1.2c-0.9,1.4-1.8,2.9-2.7,4.2c-0.4,0.6-0.5,1.1-0.1,1.8c0.6,1,1.2,1.9,1.8,3  c1,1.8,1.9,3.7,2.7,5.6c0.2,0.5,0.3,1,0.4,1.8c-2.1-1-2.9-2.8-4-4.2c-1.1-1.4-2.1-2.8-3.3-4.4c-1.4,1.2-2.6,2.2-3.9,3.4  c1.9,3,3.7,5.8,5.6,8.7c0.5-0.2,1.1-0.4,1.5-0.5c1.6,1.6,1.5,1.6,0.7,3.5c-0.2,0.5-0.2,1.2-0.1,1.8c0.1,0.7,0.3,1.5,0.6,2.4  c-0.6-0.1-0.9-0.1-1.1-0.2c-1.1-0.7-1.9-0.3-2.5,0.6c-0.7,1-1.5,2-2.1,3c-0.3,0.4-0.5,1.2-0.3,1.5c1,2.1,2.2,4.1,3.4,6.3  c1.2-0.7,2.1-1.3,3.1-1.9c0.6,1.1,0.2,2-0.1,2.8c-0.6,1.6-1.4,3.1-2,4.7c-0.5,1.1-1.3,1.9-2.5,1.7c-1.8-0.3-2.9,0.7-4.4,1.9  c0.9,1.4,1.8,2.8,2.7,4.3c2.4-0.6,3.8-3.3,6.5-2.7c0.2,1.5-1,2-1.6,2.7c-1.4,1.4-2.4,2.9-3.1,4.8c-0.5,1.4-1.2,2.8-3.1,2.7  c-0.6,0-1.2,0.6-1.8,1c-0.6,0.4-1.1,0.9-1.6,1.4c-0.7,0.6-1.5,0.4-2.2,0c-0.8-0.5-0.4-1.3,0-1.9c0.6-0.9,1.2-1.8,1.9-2.6  c0.6-0.8,0.8-1.5,0.2-2.3c-0.8-1.2-1.6-2.4-2.5-3.7c-1.6,1.2-3.1,2.3-4.7,3.5c1,1.5,1.9,2.8,2.8,4.1c0,0.2,0,0.3-0.1,0.4  c-1.8,2.7-3.5,3-5.6,0c-1.7-2.4-3.3-5-4.9-7.5c-0.6-0.9-1.3-1.6-1.9-2.3c-2.3,0.7-3.6,2.3-5,3.7c-0.8,0.8-1.7,1.5-2.7,2.1  c-1.8,1.1-3.9,1.4-6,1.8c-0.6,0.1-1.5-0.5-1.9-1c-1.3-1.5-2.4-3.2-3.6-4.8c-0.4-0.6-0.8-1.2-1.3-1.9c-1.6,1.2-3.1,2.3-4.6,3.4  c0.3,0.6,0.5,1,0.8,1.3c1.4,1.2,1.2,2.6,0.5,4.1c-0.6,1.2-1.4,1.3-2.3,0.2c-0.7-0.9-1.4-1.8-2.1-2.7c-1.1,0.7-2,1.3-2.8,1.9  c-1,0.7-1.9,0.7-2.9-0.1c-1.3-1.1-1.5-1.7-0.4-3c0.7-1,1.6-1.8,2.6-2.9c-1.4-2.3-3.2-4.2-4.9-6.5c-2.8,1.3-4.4,3.7-6.4,6.1  c2,2.7,3.9,5.5,5.8,8.1c-1.7,2.4-2.6,2.6-4.4,0.7c-1.7-1.8-3.3-3.7-5.1-5.7c-1.8,0.9-3.8,1.5-4.7,3.7c-2.9-1-4.3-3.4-5.7-5.8  c-0.1-0.2,0-0.6,0.2-0.7c0.2-0.1,0.6-0.2,0.8-0.1c0.5,0.3,0.9,0.7,1.3,1.1c0.5,0.5,0.8,1.2,1.4,2c1.4-1.5,2.4-2.5,3.2-3.6  c0.3-0.3,0.3-1.1,0-1.5c-0.7-1.4-1.5-2.8-2.3-4.1c-0.5-0.7-1.1-1.2-1.8-1.7c-1.7-1.1-2-2-1.1-3.9c0.3-0.6,0.3-1.3,0.4-2  c0-0.6,0-1.1-0.1-1.9c0.8,0.3,1.3,0.5,2,0.7c1.3-1.4,2.7-2.8,4.1-4.3c0.5-0.6,0.6-1.1,0.1-1.7c-0.9-1-1.7-2.1-2.6-3.2  c-1.8,1.3-3.5,2.5-5.1,3.6c-2.2-1.5-2.4-2.7-0.8-4.5c0.7-0.7,1.4-1.4,2.1-2.1c0.7-0.7,0.7-1.4,0.3-2.3c-0.6-1.3-1.1-2.6-1.5-4  c-0.3-1-0.2-1.8,0.7-2.7c2-2.1,3.7-4.5,5.8-7c-1.2-1.5-1.7-3.6-3.5-5.2c-0.9,0.6-1.7,1.1-2.5,1.6c-1.4-1-1.6-1.5-1.2-2.8  C6.5,34,6.7,33.6,7,33.3c1.6-1.3,1.9-2.7,0.6-4.4c0-0.1-0.1-0.1-0.1-0.2c0-0.4,0.1-0.9,0.2-1.3c0.4,0.1,0.9,0,1.2,0.2  c0.6,0.4,1.1,1,1.8,1.6c2.6-2.4,5.1-4.7,7.9-7.3c-1-1.1-1.8-2.1-2.9-3.3c-1.1,1.1-2.2,1.9-3,2.9c-1.1,1.2-2.6,1.8-4,2.3  c-0.2,0.1-0.6-0.2-1.3-0.3c1.9-2.6,4.7-4.1,6.5-6.8c-0.9-1.2-1.8-2.4-2.7-3.6c-1-1.4-1.8-3-1-4.8c0.3-0.6,0.8-1,1.2-1.6  c2.1,2.3,4.1,4.4,6,6.5c2.8-2.4,5.3-4.7,8.1-7.1c1.5,1.7,2.8,3.2,4,4.7C33,9.1,36.5,7.4,40,5.7c1.6,2.1,3.1,4,4.8,6.2  c0.8-0.7,1.4-1.2,1.9-1.8c0.7-0.7,1.4-1.4,2.3-2c2.3-1.6,4.8-1.2,6.6,0.8c0.8,1,1.7,2,2.5,2.9c0.1,0.1,0.3,0.1,0.5,0.2  c1.6-1.2,3.2-2.4,4.9-3.6c0-1.1-1-2.2,0.2-3.2c0.9,0,1.6,0.6,2.2,1.3c1.3,1.5,2.5,3,3.7,4.4c0.7,0.8,1.4,1.6,2.3,2.6  c1.7-1.5,3.6-2.6,4.8-4.3c1-1.3,2.3-1.7,3.8-2.6C80.6,7.5,81,8.2,81,8.8c-0.3,2.5,1.3,3.9,3.1,5.6c1.3-1.3,2.5-2.5,3.8-3.8  c0.6-0.6,1.2-1.3,1.8-1.8C90,8.5,90.5,8.3,91,8.1c0.5,1.7,0.4,3.2-0.6,4.4c-0.9,1.3-2,2.5-3,3.6c-1.2,1.4-1.2,1.3-0.2,2.9  c2.2,3.6,4.4,7.2,6.5,10.8C94.4,31,95.2,32.2,95,33.9z M55.1,71.2c-3.2,2.6-6.3,5-8.7,8.2c1.8,2.3,3.5,4.5,5.4,6.9  c2.7-3.2,5.2-6.2,7.8-9.4C58.2,75,56.7,73.2,55.1,71.2z M47.3,60.4c-1,0.9-1.8,1.7-2.7,2.4c-1.7,1.3-3.4,2.6-5.1,3.9  c-0.6,0.5-1.2,1-0.7,1.8c1.2,1.9,2.3,3.9,4,5.8c2.8-2.5,5.4-4.8,8.1-7c0.7-0.6,0.7-1.3,0.2-1.9C49.9,63.7,48.7,62.2,47.3,60.4z   M16.5,38c3.1-2.6,5.9-5.1,8.8-7.5c-1.4-1.7-2.5-3.2-3.6-4.6c-3.4,1.9-6,4.3-8.6,7.2C14.2,34.6,15.3,36.2,16.5,38z M34.6,62.3  c3.1-2.3,5.9-4.3,9-6.6c-1.3-1.8-2.3-3.5-4.2-4.8c-2.7,2.2-5.4,4.4-8.3,6.7C32.4,59.3,33.4,60.7,34.6,62.3z M27,52.1  c3-2.3,5.8-4.5,8.7-6.7c-1.1-1.8-1.9-3.4-3.4-4.7c-3,2.3-6.3,4-8.8,7C24.7,49.2,25.7,50.5,27,52.1z M29.5,74.7  c1.8,2.3,3.3,4.5,5.3,6.3c1.7-1.5,3.3-2.8,4.9-4.2c-1.5-2.3-2.9-4.4-4.4-6.6C33.4,71.7,31.6,73.1,29.5,74.7z M81.9,59.2  c1-0.9,1.6-1.6,2.3-2.2c1.3-1.3,1.4-1.4,0.4-2.9c-1.3-2.1-2.7-4.2-4.1-6.2c-0.3-0.4-0.7-0.8-1.2-1.3c-1,0.8-1.9,1.5-2.7,2.2  c-0.6,0.5-0.7,1.1-0.3,1.7C78.1,53.3,79.9,56.1,81.9,59.2z M82.9,21.4c-0.7,0.9-1.2,1.5-1.7,2.1c-0.8,1-0.8,1.8,0,2.9  c1.6,2.2,3.1,4.5,4.6,6.7c0.3,0.5,0.8,0.9,1.3,1.5c1.3-1.2,2.4-2.2,3.6-3.3C88,28,85.6,24.8,82.9,21.4z M30.9,16.6  c-2.5,1.6-3.9,3.9-5.9,5.8c1.4,1.7,2.6,3.3,3.8,4.8c2-1.2,5.1-4.4,5.8-6C33.4,19.7,32.2,18.2,30.9,16.6z M78.2,28.2  c-1.4,1.7-2.6,3.1-3.9,4.6c2.1,2.5,4,4.9,6,7.4c1.4-1.1,2.7-2,4-3.1C82.3,34.1,80.4,31.4,78.2,28.2z M76.3,64.3  c-1.6-4.6-3.6-8.4-5.1-9.5c-1,1.2-2.1,2.5-3.1,3.8c-0.3,0.4-0.4,1.2-0.2,1.5c1.5,2.3,3.2,4.5,5,7C74.2,66.1,75.3,65.2,76.3,64.3z   M69,70.1c-1.1-2.4-3.9-6.3-5.3-7.4c-1.4,1.2-2.8,2.5-4.3,3.9c1.6,2.3,3.1,4.3,4.7,6.6C65.9,72.1,67.4,71.2,69,70.1z M25.8,69.8  c2.2-1.9,4.2-3.5,6.3-5.3c-1-1.3-1.8-2.5-2.8-3.7c-0.7-0.9-1.6-0.9-2.4-0.2c-1.4,1.2-2.8,2.4-4.2,3.6c-0.6,0.5-0.6,1.1-0.1,1.7  C23.6,67.1,24.6,68.4,25.8,69.8z M17.1,79c1.9-2.1,3.5-3.8,5.2-5.6c0.7-0.8,0.6-1.6-0.1-2.2c-0.9-0.9-1.9-1.8-3-2.9  c-1.7,1.7-3.4,3.2-4.9,4.9c-0.3,0.3-0.3,1.1-0.1,1.5C15,76.1,16,77.4,17.1,79z M64.2,44.4c-1.5,1.6-3.4,2.5-4.5,4.4  c1.5,2,3,3.9,4.5,5.9c1.9-1.3,3-3,4.1-4.9C67,48.1,65.7,46.4,64.2,44.4z M53.3,47c-1.4-1.9-2.6-3.6-4.1-5.5  c-1.8,1.8-3.4,3.4-5.2,5.1c1.4,1.7,2.7,3.2,4.1,4.9C50,49.9,51.6,48.5,53.3,47z M67.7,78.7c1.3,2,2.1,4.1,3.9,5.6  c1.8-1.4,3.4-2.6,5.1-4c-1.3-2-2.5-3.8-3.9-5.9C70.9,75.9,69.4,77.2,67.7,78.7z M23.8,54.3c-0.9-1.5-1.8-3-3.3-4.3  c-1.7,1.6-3.2,3.1-4.7,4.6c-0.5,0.5-1,1.2-0.5,1.9c0.9,1.2,1.6,2.7,3.1,3.5C20.2,58.2,21.9,56.4,23.8,54.3z M21.5,44.7  c3.1-2.5,6-4.9,8.9-7.3c-0.9-1.4-1.4-2.6-2.6-3.3c-2.8,2.6-5.6,5.2-8.5,7.8C20,42.8,20.7,43.6,21.5,44.7z M56,61.9  c1.8-1.4,3.3-2.7,4.9-3.9c-1.2-2.4-2.6-4.2-4.4-6.2c-1.5,1.7-2.8,3.2-4.2,4.9C53.3,58.2,54.5,59.9,56,61.9z M40.4,16.2  c-1.3-2.4-2.5-4.6-4-7.3c-0.1,2.2-1.4,3.2-2.6,4.2c-0.3,0.3-0.7,0.6-0.9,0.9c-0.2,0.4-0.3,1.1,0,1.4c1.2,1.4,2.1,3.2,3.9,4.3  C38,18.5,39.3,17.3,40.4,16.2z M71,35.7c-0.9,1-1.7,1.7-2.2,2.5c-0.3,0.5-0.4,1.5-0.1,2c1.3,1.9,2.7,3.8,4.4,5.5  c1.3-1.1,2.5-2,3.9-3.1C75,40.3,73.1,38.2,71,35.7z M64.4,20.1c1.7-1.4,3.1-2.7,4.6-4c-1.5-2.1-2.8-4-4.2-5.9  c-1.4,1.9-2.7,3.6-4.1,5.3C62,17.1,63.1,18.5,64.4,20.1z M42.9,32.1c-2.2,1.9-4.1,3.6-6.1,5.4c1.2,1.4,1.9,2.9,3.5,4  c1.8-1.7,3.5-3.4,5.3-5.1C44.7,34.9,43.9,33.7,42.9,32.1z M56.6,34.7c-1.6,1.5-3.1,2.8-4.6,4.2c1.4,1.8,2.7,3.4,3.8,4.8  c1.6-1.6,3-3.1,4.6-4.6C59.2,37.7,58,36.3,56.6,34.7z M22.2,18.3c1.8-2,3.5-3.8,5.4-5.9c-0.8-1.2-1.6-2.5-2.5-4  c-0.5,0.4-0.9,0.6-1.2,0.9c-0.9,1.1-1.7,2.3-2.7,3.3c-2.9,2.8-1.9,2.6,0.1,5.1C21.4,17.9,21.6,18,22.2,18.3z M37.7,25  c-1.9,2.3-4.7,3-6.1,5.6c0.7,1.1,1.4,2.4,2.7,3.1c1.9-1.9,3.8-3.7,5.8-5.6C39.3,27.1,38.6,26.3,37.7,25z M72,20.2  c-1.5,1.6-2.8,2.9-4.1,4.3c1,1.8,2,3.2,3.5,4.4c1.1-1.2,2.1-2.4,3.2-3.6c0.5-0.6,0.5-1.1,0-1.7C73.8,22.6,73.1,21.6,72,20.2z   M68.4,32.4c-1.3-1.7-2.4-3.1-3.5-4.6c-1.6,0.9-2.8,1.8-3.8,3.2c1.4,1.5,2.4,3.2,4.2,4.6C66.4,34.5,67.4,33.5,68.4,32.4z M52.4,30.2  c-1.2-1.3-2.2-2.5-3.3-3.9c-1.4,1.3-2.7,2.5-3.9,3.6c1.2,2.2,1.9,3,3.3,3.9C49.7,32.7,50.9,31.5,52.4,30.2z M52.5,10.9  c-1.7,1.6-3.1,2.9-4.7,4.4c0.9,1.1,1.8,2.2,2.9,3.5c1.3-1.2,2.5-2.1,3.6-3.2c0.3-0.3,0.4-1.1,0.2-1.5C54,13.1,53.2,12.1,52.5,10.9z   M83.8,75.2c-1.6-2.2-2.9-4.2-4.4-6.4c-1,0.9-1.9,1.8-2.9,2.7c1.6,2.1,3.1,3.9,4.6,5.8C82,76.5,82.9,75.9,83.8,75.2z M60.8,23  c-1-1.6-1.9-3-3.4-4.1c-1.3,1.2-2.5,2.3-3.8,3.5c1.2,1.3,2.2,2.5,3.4,3.8C58.4,25.1,59.6,24.1,60.8,23z M74.6,17.3  c1.1,1.6,1.8,3,3.4,4c0.8-1,1.6-1.9,2.3-2.8c0.2-0.2,0.3-0.6,0.2-0.8c-0.7-1.2-0.7-2.7-2.2-3.8C77.2,15,76,16.1,74.6,17.3z   M11.9,52.2c2.2-1.8,4.2-3.4,6.3-5.1c-0.9-1-1.5-1.9-2.4-3c-1,1.3-1.7,2.4-2.5,3.3c-0.9,0.9-1.9,1.6-3,2.6  C10.8,50.7,11.3,51.4,11.9,52.2z M42,26.6c1.5-1.4,2.8-2.6,4.1-3.9c-1-1-1.7-1.8-2.5-2.8c-1.4,1.3-2.7,2.4-4,3.6  C40.4,24.6,41.1,25.4,42,26.6z"/>
        </svg>
    , 
    downList: 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
    ,
    upList: 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
        </svg>
    , 
    italic: 
        <svg className="w-6 h-6" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
            <path d="m624.37 853.16 101.61-508.05c89.648-8.7891 174.02-26.367 174.02-26.367v-93.75h-450v93.75s48.348 20.145 125.63 28.086l-101.61 508.05c-89.648 8.7891-174.02 26.367-174.02 26.367v93.75h450v-93.75s-48.348-20.145-125.63-28.086z" fillRule="evenodd"/>
        </svg> 
    ,
    bold: 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5">
            <g>
                <path d="M25.81,17.31a6.7411,6.7411,0,0,0-1.89-2.01A7.9268,7.9268,0,0,0,25.9,9.76c0-5.12-3.74-7.81-8.87-7.76H7.78A2.9983,2.9983,0,0,0,5,5.17V26.83A2.9983,2.9983,0,0,0,7.78,30h9.86c5.48.04,9.34-2.57,9.36-8.06A8.5915,8.5915,0,0,0,25.81,17.31ZM11,7h5.27c2.27.04,3.79.69,3.8,3.02-.02,2.29-1.55,2.95-3.8,2.98H11Zm5.83,18H11V19h5.83c3.47,0,3.92,1.6,3.92,3S20.3,25,16.83,25Z" fill="black"/>
            </g>
        </svg>
    ,
    underline: 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className="w-5 h-5">
            <g>
                <g>
                    <path d="M3 1V7C3 9.76142 5.23858 12 8 12C10.7614 12 13 9.76142 13 7V1H11V7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7V1H3Z" fill="black"/><path d="M14 15V13H2V15H14Z" fill="black"/>
                </g>
            </g>
        </svg>
    ,
    save: 
    <svg viewBox="0 0 21 21" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(4 4)">
            <path d="m2.5.5h7l3 3v7c0 1.1045695-.8954305 2-2 2h-8c-1.1045695 0-2-.8954305-2-2v-8c0-1.1045695.8954305-2 2-2z"/>
            <path d="m4.50000081 8.5h4c.55228475 0 1 .44771525 1 1v3h-6v-3c0-.55228475.44771525-1 1-1z"/>
            <path d="m3.5 3.5h2v2h-2z"/>
        </g>
    </svg>
} 