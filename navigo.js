import { getItemFromLocalStorage } from './utils.js'

var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'
var router = new Navigo(root, useHash, hash);

router
    .on({
        'homepage-screen': function() {
            redirect('homepage-screen')
        },
        'login-screen': async function() {
            redirect('login-screen')
        },
        'signup-screen': function() {
            redirect('signup-screen')
        },
        'quiz-display/:id/:player': function({ id, player }) {
            redirect('quiz-display', id, player)
        },
        'quiz-starter/:id': function({ id }) {
            redirect('quiz-starter', id)
        },
        'quiz-creator': function() {
            redirect('quiz-creator')
        },
        'quiz-record/:id': function({ id }) {
            redirect('quiz-record', id)
        },
        'home-screen': async function() {
            const check = await checkAuthen()
            if (check) {
                redirect('home-screen')
            } else {
                router.navigate('homepage-screen')
            }
        },
        '*': function() {
            router.navigate('home-screen')
        },
    })
    .resolve();

function redirect(screenName, id, player) {
    if (screenName === 'home-screen') {
        document.getElementById('container').innerHTML = `
            <home-screen></home-screen>
        `
    } else if (screenName === 'signup-screen') {
        document.getElementById('container').innerHTML = `
            <signUp-screen></signUp-screen>
        `
    } else if (screenName === 'login-screen') {
        document.getElementById('container').innerHTML = `
            <login-screen></login-screen>
        `
    } else if (screenName === 'quiz-creator') {
        document.getElementById('container').innerHTML = `
            <quiz-creator></quiz-creator>
        `
    } else if (screenName === 'quiz-starter') {
        document.getElementById('container').innerHTML = `
            <quiz-starter id=${id}></quiz-starter>
        `
    } else if (screenName === 'quiz-display') {
        document.getElementById('container').innerHTML = `
            <quiz-display id=${id} player=${player}></quiz-display>
        `
    } else if (screenName === 'quiz-record') {
        document.getElementById('container').innerHTML = `
            <quiz-record id=${id}></quiz-record>
        `
    } else if (screenName === 'homepage-screen') {
        document.getElementById('container').innerHTML = `
            <homepage-screen></homepage-screen>
        `
    }
}

async function checkAuthen() {
    const user = getItemFromLocalStorage('currentUser');
    if (user) {
        const res = await firebase.firestore()
            .collection('Accounts')
            .where('userName', '==', user.userName)
            .where('password', '==', user.password)
            .get()
        if (res.empty) return false;
        return true;
    }
    return false;
}

window.router = router