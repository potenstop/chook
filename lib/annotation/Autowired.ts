/**
 *
 * 功能描述:
 *
 * @className Autowired
 * @projectName chook
 * @author yanshaowen
 * @date 2018/12/21 22:19
 */

function Autowired(i: number): any;
function Autowired(i: string): any;

function Autowired(i: number| string): any {
    return () => {
        console.log("1111111");
    };
}

export default Autowired;
