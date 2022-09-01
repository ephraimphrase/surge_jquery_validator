(function ($) {
    $.fn.valid = function (options) {

        //optional parameters
        let settings = $.extend({
            passwordStrict: true 
        }, options)

        //error messages
        let emptyText = "<p class='invalidText' style='color:red'>This field cannot be empty</p>";
        let invalidName = `<p class='invalidText' style='color:red'>Enter a valid name</p>`;
        let invalidNumber = `<p class='invalidText' style='color:red'>Enter a valid phone number</p>`;
        let invalidEmail = `<p class='invalidText' style='color:red'>Enter a valid email</p>`;
        let validPassword = `<p class='invalidText' style='color:red'>Password is too weak</p>`;
        let specialChar = `<p class='specialChar' style='color:red'>must contain special characters, uppercase letters, lowercase letters, numbers</p>`
        let invalidPassword = `<p class='invalidText' style='color:red'>Passwords don't match</p>`;

        return this.each(function () {
            $(this).find("input, select, textarea, dataList").not($(":button")).each(function () { 
                $('.name').each(function(){
                    checkEmpty($(this));
                    checkNames($(this))
                })

                //Because both confirmpassword and password fields are both password types give an id of password
                $('#password').each(function(){
                    checkEmpty($(this));
                    checkPassword($(this));
                }) 

                //Because both confirmpassword and password fields are both password types give an id of confirmpassword
                $('#confirmpassword').each(function(){
                    checkEmpty($(this));
                    confirmPassword($(this))
                })
                $('#phone').each(function(){
                    checkEmpty($(this));
                    checkNumber($(this))
                })

                //jquery has no support for email type so give id of email instead
                $('.email').each(function(){
                    checkEmpty($(this));
                    checkEmail($(this))
                })
            })

            //check if inputs are empty
            function checkEmpty(element) {
                if (element.val().length == 0) {
                    element.addClass('invalid')
                    if (element.next().hasClass('invalidText')) {
                        element.next().remove()
                    }
                    element.after(emptyText)
                } else {
                    element.removeClass('invalid')
                    if (element.next().hasClass('invalidText')) {
                        element.next().remove()
                    }
                }
            }

            //check and validate name fields using regex i.e must be only alphabet
            function checkNames(element){
                let regex = /^[a-zA-Z\s]+$/; //regex
                if (regex.test(element.val())) {
                    element.removeClass('invalid')
                    if (element.next().hasClass('invalidText')) {
                        element.next().remove()
                    }
                } else {
                    element.addClass('invalid')
                    if (element.next().hasClass('invalidText')) {
                        element.next().remove()
                    } 
                    element.after(invalidName)
                }
            }

            //check and validate phone number fields using regex i.e must be only numbers
            function checkNumber(element){
                let regex = /^[1-9]\d{9}$/; //regex
                if (regex.test(element.val())) {
                    element.removeClass('invalid')
                    if (element.next().hasClass('invalidText')) {
                        element.next().remove()
                    }
                } else {
                    element.addClass('invalid')
                    if (element.next().hasClass('invalidText')) {
                        element.next().remove()
                    } 
                    element.after(invalidNumber)
                }
            } 

            //check and validate email using regex i.e must contain @ and .
            function checkEmail(element){
                let regex = /^\S+@\S+\.\S+$/ //regex
                if (regex.test(element.val())) {
                    element.removeClass('invalid')
                    if (element.next().hasClass('invalidText')) {
                        element.next().remove()
                    }
                } else {
                    element.addClass('invalid')
                    if (element.next().hasClass('invalidText')) {
                        element.next().remove()
                    } 
                    element.after(invalidEmail)
                }
            }

            // check and validate password
            function checkPassword(element) {
                // check if password length is less than 8 characters
                if (element.val().length < 8) {
                    element.addClass('invalid')
                    if (element.next().hasClass('invalidText')) {
                        element.next().remove()
                    } 
                    if(element.next().hasClass('specialChar')){
                        element.next().remove()
                    }
                    element.after(validPassword)
                } else {
                    element.removeClass('invalid')
                    if (element.next().hasClass('invalidText')) {
                        element.next().remove()
                    } else if(element.next().hasClass('specialChar')){
                        element.next().remove()
                    }
                }

                //passwordStrict option
                passwordStrict = settings.passwordStrict

                //validate password with regex if passwordStrict is true
                if (passwordStrict == true) {
                    let format = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/; //regex 
                    if(format.test(element.val())){
                        element.removeClass('invalid')
                        if (element.next().hasClass('invalidText')) {
                            element.next().remove()
                        } else if(element.next().hasClass('specialChar')){
                            element.next().remove()
                        }
                    } else {
                        element.addClass('invalid')
                        next1 = element.next()
                        if (element.next().hasClass('invalidText')) {
                            element.next().remove()
                        } else if(next1.next().hasClass('specialChar')){
                            element.next().remove()
                        }
                        element.after(validPassword+specialChar)
                    }
                }
            }

            //compare password input with this and display an error if they dont match
            function confirmPassword(element) {
                let password = $('#password').val()
                let password1 = element.val()
                if (password != password1) {
                    element.addClass('invalid')
                    if (element.next().hasClass('invalidText')) {
                        element.next().remove()
                    } 
                    element.after(invalidPassword)
                } else {
                    element.removeClass('invalid')
                    if (element.next().hasClass('invalidText')) {
                        element.next().remove()
                    } 
                }
            }
        })
    }

    $('form').submit(function (e) {
        e.preventDefault()
        $('form').valid() 
    })
}(jQuery));