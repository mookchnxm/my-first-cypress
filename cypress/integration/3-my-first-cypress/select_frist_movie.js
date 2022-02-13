import moment from 'moment';
// เปลี่ยนภาษาให้เป็นภาษาไทย
moment.locale('th');
// intData = Object
const initData = {
    url: 'https://www.sfcinemacity.com',
    todayDate: moment().format('DD MMM YYYY'),
    nowTime: moment().format('HH:mm'),
    expectTime: moment().add(1, 'hours').format('HH:mm'),
    nameMovie: 'วันสุดท้าย..ก่อนบายเธอ',
    locationMovie: 'เอส เอฟ ซีเนม่า โรบินสัน ลพบุรี'
};

describe('Check Time Movie', () => {
    it('Go to url', () => {
        cy.visit(initData.url)
    })
    it('Check Cinema', () => {
        cy.get('[class="button dropdown-button"]')
            // contains เป็นคำสั่งที่ตรวจสอบ Text
            .contains('เลือกโรงภาพยนตร์')
            .click()
        //  เราจะเลือกโรงแรกสุด โดยวนลูปในคลาส cinema-item ที่เป็นแท็ก  a 
        cy.get('[class="cinema-item"]>a').each($list => {
            // วนลูปไปเรื่อยๆ แล้วเก็บในตัวแปร $list แสดงค่า $list ออกมา  คือค่าแรกสุด
            cy.log($list.get(0).innerText)
            cy.wrap($list).click()
            // คือให้มันวนแค่รอบเดียวพอ
            return false
        })
    })
    it('Select Movie', () => {
        cy.get('[class="button dropdown-button"]')
            .contains('ภาพยนตร์ทั้งหมด')
            .click()

        cy.get('[class="movie-item"]>a').each($list => {
            cy.log($list.get(0).innerText)
            cy.wrap($list).click()
            return false
        })
        cy.get('[class="button showtime-button"]')
            .contains('รอบฉาย')
            .click()
    })
    it('Check Date Movie', () => {
        cy.get('[class="selected"]>p')
            .contains(initData.todayDate)
    })
    it('Check Time Movie', () => {
        // cy.get('[class="showtime-list"]>div')
        //     .children()
        //     .children()
        //     .children()
        //     .children()
        // วนลูป  li ที่อยู๋ใต้ คลาส time-list  
        cy.get('[class="time-list"]>li').each($list => {
            // แสดงผล ค่า li ออกมา 
            cy.log($list.get(0).innerText)
        })
    })
    it('Select Time Movie +1 ', () => {
        cy.get('[class="time-list"]>li').each($list => {
            if (
                $list.get(0).innerText >= initData.nowTime &&
                $list.get(0).innerText <= initData.expectTime
            ) {
                cy.wrap($list.children()).click()
                return false
            }
        })
    })
})