type Lang = "en" | "ar" | "ku";

const monthsMap: Record<Lang, string[]> = {
    en: [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
    ],
    ar: [
        "يناير","فبراير","مارس","أبريل","مايو","يونيو",
        "يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"
    ],
    ku: [
        "کانونی دووەم","شوبات","ئازار","نیسان","ئایار","حوزەیران",
        "تەمموز","ئاب","ئەیلوول","تشرینی یەکەم","تشرینی دووەم","کانونی یەکەم"
    ],
};


export const getMonths = (lang: Lang = "en"): string[] => {
    return monthsMap[lang] || monthsMap["en"];
}
