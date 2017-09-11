export class ContactDetail {
    public name: any;
    public shortname: any;
    public address1: any;
    public address2: any;
    public telephone: any;
    public fax: any;
    public email: any;
    public website: any;
    public code: any;
    public lat: any;
    public lng: any;

    constructor(name, shortname, address1, address2, telephone, fax, email, website, code, lat, lng) {
        this.name = name;
        this.shortname = shortname;
        this.address1 = address1;
        this.address2 = address2;
        this.telephone = telephone;
        this.fax = fax;
        this.email = email;
        this.website = website;
        this.code = code;
        this.lat = lat;
        this.lng = lng;
    }
}