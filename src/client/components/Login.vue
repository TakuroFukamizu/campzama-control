<template lang="pug">
form(method='POST' action='/login')
    div
        label(for='name') Name:
        input#name.form-control(type='text', placeholder='first and last' name='name')
    div
        label(for='pw') Password:
        input#pw.form-control(type='password' name='password')
    button.btn.btn-primary(type='submit') Sign up

    //- form.mx-auto.row(role="form" @submit="onSubmit" @reset="onReset")
    //-     .col-lg-4.col-md-3.col-sm-2
    //-     .col-lg-4.col-md-6.col-sm-8
    //-         .logo.row
    //-             img.col-2(src='@/resources/img/icon_path.png', alt='Logo')
    //-             h1.col-10 Blue Earth Platform
    //-         .row.loginbox
    //-             .col-lg-12
    //-                 span.singtext Log in
    //-             .col-lg-12.col-md-12.col-sm-12
    //-                 input.form-control#email(type='email' placeholder='Please enter your email' v-model="form.userId" required)
    //-             .col-lg-12.col-md-12.col-sm-12
    //-                 input.form-control#password(type='password' placeholder='Please enter password' v-model="form.password" required)
    //-             .col-lg-12.col-md-12.col-sm-12
    //-                 b-alert(variant="danger" :show="showFailAlert") {{ message.failedLogin }}
    //-                 //- a.btn.submitButton(href='#' @click='onSubmit') Submit
    //-                 button.btn#submitButton(type="submit") Submit
    //-         .row.utils
    //-             b-form-checkbox(v-model="form.rememberMe") Remember me
    //-     .col-lg-4.col-md-3.col-sm-2
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';

/**
 * Vue Component
 */
@Component
export default class Login extends Vue {

}

</script>
