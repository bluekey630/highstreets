export class GlobalData {
    public static cities: any[] = [];
    public static parent_cities: any[] = [];
    public static references: any[] = [];
    public static ALL_STREET_FLAG = 0;
    public static lang_data = [];
    public static device_lang = 'en';
    public static cur_country = 'de';
    public static alphaFlag = true;
    public static filterFlag = false;
    public static population: any = { lower: 10000, upper: 3500000 };
    public static population_dev: any = { lower: -10, upper: 10 };
    public static social_insurance: any = { lower: 5000, upper: 2000000 };
    public static unemployment_rate: any = { lower: 2, upper: 30 };
    public static purchasing_power: any = { lower: 40, upper: 150 };
    public static certrality_param: any = { lower: 50, upper: 300 };
    public static city_ranking: any = { lower: 0, upper: 7 };

    public static fav_filterFlag = false;
    public static fav_population: any = { lower: 10000, upper: 3500000 };
    public static fav_population_dev: any = { lower: -10, upper: 10 };
    public static fav_social_insurance: any = { lower: 5000, upper: 2000000 };
    public static fav_unemployment_rate: any = { lower: 2, upper: 30 };
    public static fav_purchasing_power: any = { lower: 40, upper: 150 };
    public static fav_certrality_param: any = { lower: 50, upper: 300 };
    public static fav_city_ranking: any = { lower: 0, upper: 7 };


    public static sort_alphabetical = true;
    public static sort_population = false;
    public static sort_population_dev = false;
    public static sort_social_ins = false;
    public static sort_unemployment_rate = false;
    public static sort_purchasing_power = false;
    public static sort_centrality_param = false;
    public static sort_highest_rent = false;
    public static sort_city_ranking = false;

}