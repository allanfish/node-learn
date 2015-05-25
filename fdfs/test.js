var Promise = require('bluebird'),
    FdfsClient = require('fdfs-client'),
    debug = require('debug')('fdfs');

describe('test fastdfs', function () {
    var fdfs,
        fileId = 'group1/M00/00/09/wKgBR1TUGgeEGzCdAAAAAEcZHjA204.jpg';

    before(function () {
        fdfs = new FdfsClient({
            trackers: [
                {
                    host: '192.168.1.71',
                    port: 22122
                }
            ],
            logger: {
                log: debug
            }
        })
    });
    this.timeout(15000);

    it('test set metadata', function (done) {
        Promise.promisify(fdfs.setMetaData, fdfs)(fileId, {
            fileName: 'Jellyfish.jpg',
            type: 'jpg'
        }).then(function (result) {
            console.log("set metadata: ", result);
            return Promise.promisify(fdfs.getMetaData, fdfs)(fileId);
        }).then(function (result) {
            console.log("get  metadata: ", result);
            done();
        }).catch(done);
    });

    it.only("get metadata", function (done) {
        Promise.promisify(fdfs.getMetaData, fdfs)(fileId).then(function (result) {
            console.log("get  metadata: ", result);
            done();
        }).catch(done)
    });
});