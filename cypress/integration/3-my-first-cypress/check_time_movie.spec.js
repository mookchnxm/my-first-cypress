// เรียกใช้ moment เพราะ cypress ตอนนี้่ไม่มี
import moment from 'moment';
// เปลี่ยนภาษาให้เป็นภาษาไทย
moment.locale('th');
// intData = Object
const initData = {
    url: 'https://www.sfcinemacity.com',
    todayDate: moment().format('DD MMM YYYY'),
    nowTime: moment().format('HH:mm'),
    // เวลาที่คาดหวังคือ + 1 ชม
    expectTime: moment().add(1, 'hours').format('HH:mm'),
    nameMovie: 'วันสุดท้าย..ก่อนบายเธอ',
    locationMovie: 'เอส เอฟ ซีเนม่า โรบินสัน ลพบุรี'
};

describe('Check Time Movie', () => {
    it('Go to url', () => {
        // cy.visit คือเข้าเว็บนั้น
        cy.visit(initData.url)
    })
    // now 13/02/64 dont have popup 
    // it('Enter site', () => {
            // หาปุ่ม เข้าหน้าเว็บ แล้วก็กด เพื่อที่จะให้ popup หายไป 
    //     cy.get('[class="button button-enter-site"]').click()
    // })
    // it('Change language', () => {
            // วนลูปภายใต้คลาส ซึ่งเป็น li หาเป็นอิ้ง แล้วกด คือเปลี่ยนภาษาเป็นอิ้ง 
    //     cy.get('[class="lang-switcher"]>li').each($el => {
    //         if ($el.get(0).innerText === 'ENG') {
    //             cy.wrap($el).click()
    //         }
    //     })
            //เช็คว่ามันเป็นอิ้งจริงๆไหม 
    //     cy.get('[class="top-navigation"]').contains('Login/Sign up')
    // })
    it('Select Cinema', () => {
        cy.get('[class="button dropdown-button"]')
            .contains('เลือกโรงภาพยนตร์')
            .click()
        cy.contains(initData.locationMovie)
            .click()
    })
    it('Select Movie', () => {
        cy.get('[class="button dropdown-button"]')
            .contains('ภาพยนตร์ทั้งหมด')
            .click()
        cy.get('h3[class="name"]')
            .contains(initData.nameMovie)
            .click()
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