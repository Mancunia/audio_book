
//   <!-- Modal -->
const selectImage = (data)=>{
  console.log(data);
  if (!data.id) { return data.text; }
  var $result= $(
    `<span><img src="${data.element}"/> ${data.text} </span>`
  );
  return $result;
};


const prevenImagetDownload = ()=>{
    let image = document.querySelectorAll('img');

    image.forEach(ele=>{
        ele.addEventListener('contextmenu',(e)=>{
            e.preventDefault();
            });
            
    })
}
const preventAudioDownload = ()=>{
    let aud = document.querySelectorAll('audio');

    aud.forEach(ele=>{
        ele.addEventListener('click',(e)=>{
            alert(e);
            });
            console.log('disabled');
    });

}

const passStrenght = (pass)=>{
    const reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    return reg.test(pass);


}


const initModal = async ()=>{
    let position= $('body');
    position.append(`<div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" aria-hidden="true">
           <div class="modal-dialog modal-lg">
             <div class="modal-content">
               <div class="modal-header headerColor">
                 <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
               </div>
             <div class="modal-body">
                   
                
    </div>
             
     </div>
     </div>
     </div>`)
}
     
const bookForm = async (loc)=>{
    let position = $(loc);
    //init category


    position.append(`<form action="/book/upload" enctype="multipart/form-data" method="POST">
                       <div class="container">
                      <div class="row">
                          <!-- title and description -->
                          <div class="col-6">
                              <label for="title">Title</label>
                           <input type="text"  name="title" id="title" maxlength=50 class="form-control" required placeholder="Title">
                           <label for="description">Description</label>
                           <textarea required name="description" id="description" cols="30" maxlength=1000 class="form-control" rows="10"></textarea>
                          </div>
                          <!-- cover image here -->
                          <div class="col-6">
                              <input type="file" name="file" class="form-control"> 
                               <img id="file" class="image_viewer">
                          </div>
                      </div>
      
                     
                      <div class="row">
                          <!-- category / genre -->
                          <div class="col-6">
                          <label for="category">Category</label>
                           <select name="category" id="bookcategory" multiple="multiple" style="width: 100%" class="form-control"  >
                           
                           </select>
                           </div>

                           <div class="col-6">
                          <label for="Languages">Languages</label>
                           <select name="language" id="bookLangs" multiple="multiple" style="width: 100%" class="form-control"  >
                           
                           </select>
                           </div>


                         </div>  

                         <div class="row">
                         <div class="col-6">
                           <label for="author">Author(s)</label>
                           <input name="author" class="form-control" title="Note:Seperate authors with a '-' eg. Osei Tutu - Asabere" placeholder="eg. Osei Tutu - Asabere">
                           </div>
                           <div class="col-6">
                           <label for="owner">Owner</label>
                           <select name="owner" id="bookOwner" multiple="multiple" style="width: 100%" class="form-control"  >
                           
                           </select>

                           </div>
                          </div>
                          
                     
                      <div class="row">
                                  <div class="col-6"><button type="reset" id="genBtn"  class="btn btn-warning btn-block">Cancel</button></div>
                                  <div class="col-6"><button type="submit" id="genBtn" data-id="newBook" class="btn btn-primary btn-block">Post</button></div>
                           </div>
      
                 </div>
               </form>`)
            
                
            
}

const UpdatebookForm = async (id,loc)=>{
  let position = $(loc);
  //init category


  position.append(`<form action="/book/update" enctype="multipart/form-data" method="POST">
                     <div class="container">
                    <div class="row">
                        <!-- title and description -->
                        <div class="col-6">
                        <input type="text" name="id" value="${id}" hidden=true/>
                            <label for="title">Title</label>
                         <input type="text"  name="title" id="edit_title" maxlength=50 class="form-control" required placeholder="Title">
                         <label for="description">Description</label>
                         <textarea name="description" id="edit_description" cols="30" maxlength=1000 class="form-control" rows="10"></textarea>
                        </div>
                        <!-- cover image here -->
                        <div class="col-6">
                            <input type="file" name="file" class="form-control"> 
                             <img id="file" class="image_viewer">
                        </div>
                    </div>
    
                   
                    <div class="row">
                        <!-- category / genre -->
                        <div class="col-6">
                        <label for="category">Category</label>
                         <select name="category" id="edit_bookcategory" multiple="multiple" style="width: 100%" class="form-control"  >
                         
                         </select>
                         </div>

                         <div class="col-6">
                        <label for="Languages">Languages</label>
                         <select name="language" id="edit_bookLangs" multiple="multiple" style="width: 100%" class="form-control"  >
                         
                         </select>
                         </div>


                       </div>  

                       <div class="row">
                         
                         <label for="author">Author(s)</label>
                         <input name="author" id="edit_author" class="form-control" title="Note:Seperate authors with a '-' eg. Osei Tutu - Asabere" placeholder="eg. Osei Tutu - Asabere">
                        </div>
                        
                   
                    <div class="row">
                                <div class="col-6"><button type="reset" id="genBtn"  class="btn btn-warning btn-block">Cancel</button></div>
                                <div class="col-6"><button type="submit" id="genBtn" data-id="newBook" class="btn btn-primary btn-block">Post</button></div>
                         </div>
    
               </div>
             </form>`)
          
              
          
}



const postChapter = (id,loc)=>{
    let position = $(loc);

    position.append(`
    <form action="/chapter/upload" enctype="multipart/form-data" method="POST">
        <input type="text" name="book" value="${id}" hidden=true/>
                       <div class="container">
                      <div class="row">
                      <div class="col-6">
                      <label for="title">Chapter Title</label>
                   <input type="text"  name="title" id="title" maxlength=50 class="form-control" required placeholder="Title">
                  </div>
                  <div class="col-6">
                      <label for="title">Audio File</label>
                   <input type="file"  name="file"  class="form-control" required>
                  </div>

                      </div>

                      <div class="row">
                        <div class="col-12">
                <label for="description">Chapter Description</label>
                <textarea name="description" id="description" cols="30" maxlength=100 class="form-control" rows="10"></textarea>
                        </div>
                      </div>

                      <div class="row">
                                  <div class="col-6"><button type="reset" id="genBtn"  class="btn btn-warning btn-block">Cancel</button></div>
                                  <div class="col-6"><button type="submit" id="genBtn" data-id="newBook" class="btn btn-info btn-block">Post</button></div>
                           </div>

                      </div>

                      </form>
    `);
}

const updateChapter = (id,chap,loc)=>{
  let position = $(loc);

  position.append(`
  <form action="/chapter/update" enctype="multipart/form-data" method="POST">
      <input type="text" name="book" value="${id}" hidden=true/>
      <input type="text" name="chapter" value="${chap}" hidden=true/>
                     <div class="container">
                    <div class="row">
                    <div class="col-6">
                    <label for="title">Chapter Title</label>
                 <input type="text"  name="title" id="edit_chap_title" maxlength=50 class="form-control" required placeholder="Title">
                </div>
                <div class="col-6">
                    <label for="title">Audio File</label>
                 <input type="file"  name="file"  class="form-control">
                </div>

                    </div>

                    <div class="row">
                      <div class="col-12">
              <label for="description">Chapter Description</label>
              <textarea name="description" id="edit_chap_description" cols="30" maxlength=100 class="form-control" rows="10"></textarea>
                      </div>
                    </div>

                    <div class="row">
                                <div class="col-6"><button type="reset" id="genBtn"  class="btn btn-warning btn-block">Cancel</button></div>
                                <div class="col-6"><button type="submit" id="genBtn" data-id="newBook" class="btn btn-info btn-block">Post</button></div>
                         </div>

                    </div>

                    </form>
  `);
}


const bookDetail = (detail,loc=".book")=>{
    let position = $(loc);

    position.append(`
    <div class="row">
    <div class="col-6">
        <!-- cover -->
        <img src="${detail.cover}" alt="" id="file" class="book_img">
        
    </div>
    <div class="col-6">
        <!-- details -->
                <div class="book_title">
                    ${detail.title}
                </div>
                <hr>
                <div class="container centered" id="bookCategory">
                    ${detail.category.forEach(cate=>{ 
                        console.log(cate)
                        addCategory(cate,'bookCategory')})}
                </div>
                <hr>
                <div class="book_para">
                    <p id="description">
                    ${detail.description}
                    </p>
                </div>

                <div class="row">
            <!-- reaction -->
            <div class="col-4 ">
                <button type="button" class="">
                    Liked<span class="badge book_count" id="liked">${detail.liked}</span>
                  </button>
            </div>
            <div class="col-4">
                <button type="button" class="">
                    Disliked<span class="badge book_count" id="disliked">${detail.disliked}</span>
                  </button>
            </div>
            
            <div class="col-4">
                <button type="button" class="">
                    Listened<span class="badge book_count" id="seen"></span>
                  </button>
            </div>
            </div>
    </div>
        

        </div>
    
    
    `);
}

//card

function ad_card(book,location){
    let loc= $('#'+location);
    let categories="";
    let category ="No"
    let langs ="";

    if(book.category.length>0){//category
    category=book.category[0];

    for (let i = 0; i < book.category.length; i++) {
      
      categories+=`<a href="/filter/category/${book.category[i]}" class="badge badge-light">${book.category[i]}</a>`;

      
    }
    //   book.category.forEach(ele=>{
    //     categories+=ele+',';
    // })

    }

    if(book.languages){//language
      // category=book.category[0];
  
      for (let i = 0; i < book.languages.length; i++) {
        
        langs+=`<span class="badge badge-light">${book.languages[i]}</span>`;
  
        if(i!=(book.languages.length-1)){
          langs+=',';
        }
        
      }
      //   book.category.forEach(ele=>{
      //     categories+=ele+',';
      // })
  
      }
    

    loc.append(
        `
    <div class="col mb-4 parentDiv">
    
        <div class="ig_container jstBook">
            <img src="${book.cover}" alt="${book.title}">


        </div>
        
        <div class="delBook">

          <div class="top-top">
          <!-- book info -->
          <h3>${book.title}</h3><br>
          <span>${category}</span><br>
          <i class="fas fa-play"></i>: <span>${book.played}</span>
        </div>

       

        <div class="bottom-bottom"><!-- used to be bottom-right and btn-lg-->
          <a class="btn btn-outline-light btn-block" href="/book/Read/${book._id}"><i class="fas fa-door-open"></i>Open</a>
        </div>
        

        </div>
        <div class="tooltiptext">
        <br>
        <div class="card bg-dark cats" style="width:inherit;">
        <div class="row"><i class="fas fa-layer-group fa-1x text-white"></i>- ${categories} </div><hr>
        <div class="row"><i class="fas fa-microphone-alt fa-1x text-white"></i>- ${langs}</div><br>
        </div>
        <br>
        <div class="card bg-dark text-white" style="width:inherit;">
        <p class="desc">
        ${book.description}
        </p>
        </div>
        
        </div>

        
      </div>

    `


    );

    
      
}




const addAuthor = (name,loc)=>{
    let position = $(`#${loc}`);

    position.append(
        `<a href="#">
        <h5 class=" badge bg-dark text-light">${name}</h5>
        </a> `
    )
}


const addLangs = (name,loc)=>{
  let position = $(`#${loc}`);

  position.append(
      `<a href="#">
      <h5 class=" badge text-light">${name}</h5>
      </a> `
  )
}

//category
const addCategory=(cat_name,location='category')=>{
    let loc= $('#'+location);

    loc.append(
        $('<a/>',{'href':'/filter/category/'+cat_name,'type':'button','class':'button cat ','id':'genBtn','data-id':'cat','data-target':cat_name}).append(cat_name)
    );

}


const addBarner = (book,loc)=>{
    let position = $(loc);

    position.append(`
    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
      <div class="carousel-inner">

        <div class="carousel-item active">
          <div class="ig_container " id="biggerPicture">
              <img src="" alt="" id="bookCover">


          </div>
          <div class="top-top">
            
         <div class="pic_heading">
           <span id="bookTitle"></span>
           <span id="ifUser">
           <button  type="button" id="genBtn" data-id="bookForm" class="button btn cat signin">Add Book</button>
           </span>
            
            
         </div>

       </div>


        <div class="container centered" id="category">
          
        </div>
        <div class="container bottom-left" id="react">
         
        </div>

</div>
        
       
        
       


      </div>
    </div>
    `);
}

const addCommentIN = ()=>{
    let position = $('body');

    position.append(`
    <div id="commenting" class="floatingDiv mobile">
          <!-- comment input here -->
          <input type="text" name="" id="comment" class="myInput" placeholder="leave a comment">
          <button class="btn btn-info">>></button>
        </div>
    `);
}

const addCommentOut = (loc,msg_details)=>{
    let position = $(`#${loc}`);
    let time=new Date(msg_details.time)
    let nTime=(time.toString()).slice(0,24);
    let btn =``;
    if(msg_details.self){
      btn=`<button type="button" class="btn btn-inline-danger" id="dropComment" data-id="${msg_details.id}" title="drop comment"><i class="far fa-trash-alt"></i></button>`
    }

    position.append(`

    <div class="msg left-msg">
      <a href="/user/profile/${msg_details.user}">
       <img src="${msg_details.dp}"  class="msg-img" alt="${msg_details.username} dp">
      </a>

      <div class="msg-bubble">
        <div class="msg-info">
          <a href="/user/profile/${msg_details.user}" class="msg-info-name">${msg_details.username}</a>
          <div class="msg-info-time">${nTime}</div>
          ${btn}
        </div>

        <div class="msg-text">
         ${msg_details.comment}
        </div>
      </div>
    </div>
    <hr>

    `);

}





//functions
const addChapter = (data,loc,mine)=>{
    let position = $(`#${loc}`);
    let edit = ''
    if(mine){
      edit = `<button class="btn btn-light btn-sm cat " id="edit-chapter" data-target='${data._id }'>Edit </button>`
    }
    position.append(`
    <div class="col mb-4 chapter">
                <div class="card">
                  
                  <div class="card-body">
                  <div class="col-12">
                  
                  <div class="card-title row"><div title="">${data.title}</div> <div>${edit}</div>  </div>
                  <hr>
                  
                  <div>${data.description}</div>
                 
                  </div>
                    
                  </div>
                  <button  class="btn cat chap_btn" data-id="chapter" data-target="${data._id}">
                  <div class="card-footer">Play</div>
                  </button>
                </div>
              </div>
    `);
}





//Error and feedback handling

//toasts holder
const toastHolder = ()=>{
    $('body').append(`
    <!-- notifications -->
    <div class="floatingDivToasts" id="toasting">

      

    </div>
    `);
}

//toasts
const toast = (msg)=>{
    // console.log(msg.bg)
    $('#toasting').append(`
    <div role="alert" aria-live="assertive" aria-atomic="true" onload="attemptClose(this)" class="toast ${msg.bg}" data-bs-autohide="false">
    <div class="toast-header">
     
      <strong class="me-auto">${msg.title}</strong>
      
      <button type="button" class="btn btn-light" id="closeToast" onclick="closeToast(this)">X</button>
    </div>
    <div class="toast-body">
      ${msg.message}
    </div>
  </div>

    `);
}
const closeToast = (e)=>{
    e.parentElement.parentElement.style.display='none';
}

const attemptClose=(e)=>{
    setTimeout(() => {
        e.style.display = 'none';
    }, 4000);
}

const signUp=()=>{
    let ref = window.location.href;
    // let parts = ref.split('/');
    // // alert(parts);
    // let newLink="";
    // for(let i = 3; i<=parts.length-1;i++){
    //     alert(i);
    //     newLink+=`/${parts[i]}`;

    // }
    // alert(ref);

    window.location.href=`/user?redirect=${ref}`;
}

const myUrl = ()=>{
    const link =window.location.href;
    const params = link.split('/');

    let url= `${params[0]}//${params[2]}`;

    return url;
}

const searchDiv = (loc,data)=>{
    let position = $(`#${loc}`);
    // console.log(msg_details);

    position.append(`

    <div class="" style="width:18rem;" title="${data.description}">
    <div class="card-header row">

    <img src="${data.cover}">
    ${data.title}
    </div>
    <div class="card-body">
    <div class="row">Categories:${data.category} </div>
    <div class="row">Played:${data.played} </div>
    <a href="/book/Read/${data._id}" class="btn btn-outline-dark"><i class="fas fa-door-open"></i></a>
    </div>

    </div>
    
    <hr>

    `);
}

 //user 
 const userForm=(loc)=>{
     
    try{
const position = $(`${loc}`);
     position.append(`
     
                  
                  
     <div class=" form-floating mb-3">
    
     <div style="display:flex;"><h3>Profile Details </h3> <hr></div>
         <form action="/user/update" enctype="multipart/form-data" method="POST">
       
       <input type="file" name="dp_cover" class="form-control">
       <label for="userName">Profile Photo</label>
       
          <div class="username error"></div>
       <input type="Text" name="username" id="Uname" class="form-control" placeholder="User Name" title="Changing username wiil make it difficult for your audience to locate you">
       <label for="userName">User Name</label>
       
       <textarea name="bio" id="Ubio" class="form-control" placeholder="biograph" >

       </textarea>
       <label for="bio">Biograph</label><br>

       <button type="submit" class="cat cat_green" >Update Profile</button>
       <div class="status error"></div>
        </form>
     </div>
    
   
 
      <div class=" form-floating mb-3" id="userLog" style=" display: none;
      transition: cubic-bezier(0.175, 0.885, 0.32, 1.275);">
      
      <div style="display:flex;"><h3>Login Details </h3><hr></div>
      <!-- password_1 -->
      <div class=" form-floating mb-3">
          <div class="password error"></div>
        <input type="password" name="password" class="form-control" id="pass_1" placeholder="New Password" required="required">
        <label for="password">New Password</label>
        <div style="float:right;"><input type="checkbox" id="shwPass" value="">Show Password</div>
        
    </div>

    <!-- password_2 -->
    <div class=" form-floating mb-3">
        <div class="password error"></div>
      <input type="password" name="password" id="pass_2" class="form-control" placeholder="confirm Password" required="required">
      <label for="password">Confirm Password</label>
      
  </div>
   <button type="button" class="cat cat_green" id="updateInfo" >Update Password</button>
   <div class="status error"></div>

  <!--account details -->
  
  <div style="display:flex;"><h3>Bank Details </h3><hr></div>
  <div class=" form-floating mb-3">
<input type="text" name="bankName" id="bankName" class="form-control" placeholder="Bank Name" required="required">
<label for="bankName">Bank</label>

</div>

  <div class=" form-floating mb-3">
<input type="text" name="accountName" id="accountName" class="form-control" placeholder="Account Name" required="required">
<label for="accountName">Account Holder's name</label>

</div>

<div class=" form-floating mb-3">
<input type="text" name="accountNumber" id="accountNumber" class="form-control" placeholder="Account Number" required="required">
<label for="accountNumber">Account Number</label>

</div>

<div class=" form-floating mb-3">
<input type="text" name="accountBranch" id="accountBranch" class="form-control" placeholder="Account Branch" required="required">
<label for="password">Account branch</label>

</div>



<button type="button" class="cat cat_green" id="updateAccount" >Update Account Details</button>


      </div>
      

       <!--login details -->

 <label class="label">
     <div class="toggle">
       <input class="toggle-state" type="checkbox" id="logDetails" name="check" value="check" />
       <div class="indicator"></div>
     </div>
     <div class="label-text">Edit Additional details</div>
   </label>
     `);
    }
    catch(error){
        if(!error){
            error="Couldn't bring update form";
        }
        throw error;
    }
 }

 const forgotForm = (loc)=>{

    const position = $(`${loc}`);
     position.append(`
     <div class=" form-floating mb-3">
     <h3>Reset Password </h3>
     <label for="email">Email</label><br>
     <input type="Text" name="email" id="forgot_email" class="form-control" placeholder="Enter the Email for loggining into your account" title="Enter the Email you used to create your account">
     <div class="error" id="fgtEmail_error"></div>
     <hr>
     

     <button type="submit" id="proceed_fgt" class="cat cat_green" >Proceed</button>
     </div>
     `);
 }  

 const resendForm = (loc)=>{

  const position = $(`${loc}`);
   position.append(`
   <div class=" form-floating mb-3">
   <h3>Resend Verification Mail </h3>
   <label for="email">Email</label><br>
   <input type="Text" name="email" id="resend_email" class="form-control" placeholder="Enter the Email for loggining into your account" title="Enter the Email you used to create your account">
   <div class="error" id="fgtEmail_error"></div>
   <hr>
   

   <button type="submit" id="proceed_resend" class="cat cat_green" >Proceed</button>
   </div>
   `);
}  


 const addSubscription = (loc,details)=>{
        const position = $(`${loc}`);


        position.append(
          `
          <div class="sub-container" style="background-image: linear-gradient(to bottom right, #f0f, ${details.accent});">
          <small>
            Don't miss out the latest
          </small>
          <h2>
            ${details.name}
          </h2>
          
          <div class="amount">Amount: Ghs${details.amount}</div>
          <button style="background-image: linear-gradient(to bottom right, #f0f, ${details.accent});" target="_blank" data-id="${details.name}" id="subButton">Proceed</button>
          <small>
            Duration: ${Number(details.duration).toFixed(0)} days <hr />
            Max Users: ${details.users}<hr/>
            Auto Renewal: ${details.autorenew}
          </small>
        </div>
  
      `
  
  
      );
 }