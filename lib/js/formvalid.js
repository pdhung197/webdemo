"use strict";
$(document).ready(function () {
    /* no script */

});

function validateForm() {
    return validateFormDetail();
}

function validateFormDetail() {
    Array.from(document.querySelectorAll('.errortext')).map(function (element) {
        element.innerHTML = '';
        element.style.display = 'none';
    });
    /* Kiểm tra ô rỗng */
    let validatebool = true;

    let forminput = document.querySelectorAll('form input,form select');
    let forminputs = Array.from(forminput).filter(function (forminputelement) {
        return (!forminputelement.value.length || forminputelement.value === '');
    });
    let forminputshasval = Array.from(forminput).filter(function (forminputelement) {
        return (forminputelement.value.length);
    });
    if (forminputs.length) {
        let firstform = forminputs[0];
        errorTextSet(firstform, 'empty')
        return false;
    }
    for (let i = 0; i < forminputshasval.length; i++) {
        let forminputitem = forminputshasval[i];
        if (!dataValidate(forminputitem, forminputitem.value)) return validatebool = false;
    }
    return validatebool;
}

function dataValidate(forminputitem, value) {
    let dataValidateBool = true;
    let datatype = !forminputitem.dataset.type ? 'text' : forminputitem.dataset.type;
    let datavaluetype = forminputitem.dataset.numbertype;
    let datamin = forminputitem.dataset.min;
    let datamax = forminputitem.dataset.max;
    switch (datatype) {
        case 'number':
            dataValidateBool = validateDataNumber(forminputitem, datavaluetype, value, datamin, datamax);
            break;
        default:
            break;
    }
    return dataValidateBool;
}

function validateDataNumber(forminputitem, numbertype, value, datamin, datamax) {
    if (isNaN(value)) {
        errorTextSet(forminputitem, 'wrong', 'number', 'number');
        return false;
    }
    if (numbertype === 'integer' && !Number.isInteger(Number(value))) {
        errorTextSet(forminputitem, 'wrong', 'number', 'integer');
        return false;
    }
    if (datamin && Number(value) < Number(datamin)) {
        errorTextSet(forminputitem, 'wrong', 'number', 'smaller', datamin);
        return false;
    }
    if (datamax && Number(value) > Number(datamax)) {
        errorTextSet(forminputitem, 'wrong', 'number', 'larger', null, datamax);
        return false;
    }
    return true;
}

function errorTextSet(inputitem, typeOffErr, datatype, errDesc, datamin, datamax) {
    let errTextfront = '';
    let inputid = inputitem.getAttribute('id');
    let inputdesc = inputitem.getAttribute('placeholder');
    switch (typeOffErr) {
        case 'empty':
            errTextfront = `Vui lòng nhập ${inputdesc}`;
            break;
        case 'wrong':
            errTextfront = `Vui lòng nhập đúng ${inputdesc}`;
            break;
    }

    let errTextDesc = '';
    switch (errDesc) {
        case 'number':
            errTextDesc = '(dạng số)';
            break;
        case 'integer':
            errTextDesc = '(số nguyên)';
            break;
        case 'smaller':
            errTextDesc = `(lớn hơn ${datamin})`;
            break;
        case 'larger':
            errTextDesc = `(nhỏ hơn ${datamax})`;
            break;
        default:
            break;
    }

    let firstllabel = document.querySelector(`.errortext[for="${inputid}"]`);
    firstllabel.style.display = 'block';
    firstllabel.innerHTML = `${errTextfront} ${errTextDesc}`;
    document.getElementById(inputid).focus();
}
