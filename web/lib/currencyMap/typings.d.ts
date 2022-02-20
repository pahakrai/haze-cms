import 'currency-symbols'
// declare currency-symbols namespace
declare module 'currency-symbols'{
    namespace getCurrencySymbol{
    }
    declare function getCurrencySymbol(selector: string): string;
    export = getCurrencySymbol;
    export as namespace getCurrencySymbol;
}

