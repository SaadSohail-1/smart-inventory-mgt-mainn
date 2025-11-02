const dns = require('dns').promises;

const host = 'inventory.vuysvl3.mongodb.net';

(async () => {
  try {
    console.log('Resolving SRV for _mongodb._tcp.' + host);
    const srv = await dns.resolveSrv('_mongodb._tcp.' + host);
    console.log('SRV result:', srv);
  } catch (e) {
    console.error('SRV error:', e && e.code ? e.code : e.message);
  }

  try {
    console.log('\nResolving TXT for ' + host);
    const txt = await dns.resolveTxt(host);
    console.log('TXT result:', txt);
  } catch (e) {
    console.error('TXT error:', e && e.code ? e.code : e.message);
  }

  try {
    console.log('\nLookup A/AAAA for ' + host);
    const lookup = await dns.lookup(host, { all: true });
    console.log('Lookup result:', lookup);
  } catch (e) {
    console.error('Lookup error:', e && e.code ? e.code : e.message);
  }

  try {
    console.log('\nReverse lookup for 8.8.8.8 (sanity)');
    const rev = await dns.reverse('8.8.8.8');
    console.log('Reverse result:', rev);
  } catch (e) {
    console.error('Reverse error:', e && e.code ? e.code : e.message);
  }
})();
