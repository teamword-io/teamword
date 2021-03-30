export default function safeGTAG(){
    if(/undef/.test(typeof gtag)){
        return;
    }

    window.gtag.apply(window,arguments);
}