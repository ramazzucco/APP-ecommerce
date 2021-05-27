import { modal } from ".";

const cancel = (formName) => {
    document.querySelector("." + formName).classList.replace("d-flex", "d-none");

    const body = document.querySelector("body");
    const inputs = document.querySelectorAll("." + formName + " input");
    const selects = document.querySelectorAll("." + formName + " select");
    const inputserrors = document.querySelectorAll("." + formName + " .error");

    if(inputserrors){
        inputserrors.forEach( error => {
            error.innerHTML = "";
        })
    }

    if(body.className.includes("overflow-hidden")){
        body.classList.toggle("overflow-hidden");
    }

    if (inputs) {

        inputs.forEach((input) => {

            input.value = "";

            if (input.attributes.type.value === "checkbox"){
                input.checked = false;
                document.querySelector("." + formName + " .labelcheckbox").classList.remove("border-bottom","border-danger","text-danger");
            }

            if(input.attributes.type.value === "file"){
                input.value = '';

                if(formName === 'signup'){
                    document.querySelector('form#' + formName + ' label.avatar')
                    .innerHTML = `<i class="fas fa-upload align-self-center mr-3"></i> Imagen`;
                }
            }

            if(input.className.includes("text-danger")){
                input.classList.remove("border","border-danger","text-danger");
            }
        });
    }

    if (selects[0]) {

        if (selects.length > 1) {

            selects.forEach((select) => {
                select.options.selectedIndex = 0;
            });

        } else {

            selects[0].options.selectedIndex = 0;

        }

    }
};

const submit = async (url, options, setData, formName, data) => {
    const request = await fetch(url,options);
    const response = await request.json();
    const iconError = `<i class="far fa-times-circle mr-3"></i>`;

    console.log(response);

    if(response.error){
        let submitresponse;

        if(response.modal){
            submitresponse = { successful: false, error: response.data.message }
        } else {
            response.data.forEach( error => {
                if(!error.session && error.field !== 'modal'){
                    const input = document.querySelector(`.${formName} #${error.field}`);

                    console.log(error.field)
                    input.classList.add("border","border-danger","text-danger");

                    document.querySelector(`.${formName} .error.${error.field}`)
                        .innerHTML = error.innerHTML = iconError + error.message;
                } else {

                    response.data[0].session
                        ? modal('failed', 'Lo sentimos !', response.data[0].session)
                        : modal('failed', 'Lo sentimos !', response.data[0].message)
                }
            })
        }

        return submitresponse;
    } else {

        let submitresponse;

        if(response.data.updateduser){
            setData({...data, user: response.data.updateduser});
            submitresponse = { successful: true };
        } else {

            if(response.message){
                setData({...data, messages: [ ...data.messages, response.data ]});
                submitresponse = { successful: true };
            } else {
                setData(response.data);
            }

        }

        if(['login','signup'].includes(formName)){
            document.querySelector("." + formName).classList.replace("d-flex", "d-none");
            document.querySelector("body").classList.toggle("overflow-hidden");
        }

        if(response.data.user){
            localStorage.setItem("token", response.data.user.token);
            cancel(formName);
        }

        return submitresponse;
    }
}

export { cancel, submit };
