import moment from 'moment';
const initData = {
    url: 'https://www.sfcinemacity.com',
    todayDate: moment().format('DD MMM YYYY'),
    nowTime: moment().format('HH:mm'),
    expectTime: moment().add(1, 'hours').format('HH:mm'),
    nameMovie: 'One for the Road',
    locationMovie: 'เอส เอฟ ซีเนม่า โรบินสัน ลพบุรี'
};

describe('Check Time Movie', () => {
    it('Go to url', () => {
        cy.visit(initData.url)
    })
    it('Enter site', () => {
        cy.get('[class="button button-enter-site"]').click()
    })
    it('Change language', () => {
        cy.get('[class="lang-switcher"]>li').each($el => {
            if ($el.get(0).innerText === 'ENG') {
                cy.wrap($el).click()
            }
        })
        cy.get('[class="top-navigation"]').contains('Login/Sign up')
    })

})