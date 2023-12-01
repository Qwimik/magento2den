define(['jquery'], ($) => {
    return function () {
        const path = window.location.pathname;
        $(".sidebar a[href*='"+path+"']").addClass("active");
    }
})
