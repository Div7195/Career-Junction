import CompanySidebar from "../sidebar/CompanySidebar"


const DetailedJob = () => {

    return(
        <>
        <div style={{
            display:'flex',
            flexDirection:'row'
          }}>
          <CompanySidebar/>
            <div style={{
                display:'flex',
                width:'20px',
                justifyContent:'center',
                width:'80%'

            }}>
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    
                    border:'2px solid red'
                }}>
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                    border:'2px solid black'
                }}>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    border:'2px solid green'
                }}>
                    <div>
                    Full stack developer internship
                    </div>

                    <div style={{
                        marginRight:'10px',
                        marginLeft:'auto'
                    }}>
                    Work From home

                    </div>
                </div>

                <div style={{
                    border:'2px solid blue'
                }}>
                Web3Scope | India
                </div>

                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    border:'2px solid orange'
                }}>
                    <div style={{
                        border:'2px solid green',
                        color: '#445ee2',
                    }}>
                        Apply by 27 December 2023 • Posted 14h ago
                    </div>
                    
                    <div style={{
                        marginRight:'10px',
                        marginLeft:'auto'
                    }}>
                    <div style={{
                    
                    marginLeft:'10px',
                    fontSize:'16px',
                    fontFamily:'DM Sans',
                    backgroundColor:'#142683',
                    borderRadius:'5px',
                    fontWeight:700,
                    cursor:'pointer',
                    padding: '8px 20px 8px 16px',
                    color:'white'
                }}>Apply Now</div>
                    </div>
                    

                </div>

                

                </div>

                </div>
                </div>
            </div>
       
        </>
    )
}
export default DetailedJob