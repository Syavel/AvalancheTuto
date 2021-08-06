pragma solidity ^0.8.0;

import "ERC20.sol";
import "Ownable.sol";

contract stakedAVAX is ERC20, Ownable {

    uint256 public stakeNumber = 0;
    mapping(address=>uint256[]) public currentStakedByUser ;
    struct Stake{
        address payable user;
        uint256 stakeId ;
        uint256 amount ;
        uint256 finalAmount ;
        uint256 endingTimestamp ;
        bool updated ;
        bool redeemed ;
    }
    mapping (uint256 => Stake) public stakeds ;
    uint256 public secondsInFuture = 14*24*3600 ;
    uint256 public minimumValue = 25 ether ;

    constructor() ERC20("stakedAVAX", "sAVAX") {

    }

    function stake(uint256 timestamp) public payable {
        require(timestamp > block.timestamp + secondsInFuture, "Ending period not enough in the future");
        require(msg.value >= minimumValue, "Not enough avax for delegation");
        Stake storage s = stakeds[stakeNumber];
        s.stakeId = stakeNumber;
        s.amount = msg.value ;
        s.endingTimestamp = timestamp ;
        s.user = payable(msg.sender) ;
        currentStakedByUser[msg.sender].push(stakeNumber);

        emit Staked(s.user, s.stakeId, msg.value);
        stakeNumber++;
    }

    function updateStake(uint256 stakeId, uint256 finalAmount) public payable onlyOwner {
        require(msg.value >= finalAmount, "Not enough avax sent");
        Stake storage s = stakeds[stakeId];
        require(finalAmount >= s.amount, "final amount must be greater than deposited amount");
        s.finalAmount = finalAmount;
        s.updated = true ;

        emit StakeEnded(stakeId, finalAmount);
    }

    function redeem(uint256 stakeId) public {
        Stake storage s = stakeds[stakeId] ;
        require(s.user == msg.sender, "Not stake owner");
        require(s.endingTimestamp > block.timestamp, "Staking period not ended");
        require(s.updated == true, "Stake not yet transferred on C-chain");
        require(s.redeemed == false, "Stake already redemeed");
        require(balanceOf(msg.sender) >= s.amount, "Not enough sAVAX on address");
        s.redeemed = true ;
        _burn(msg.sender, s.amount);
        require(payable(msg.sender).send(s.finalAmount), "Send failed");

        uint256 index;
        for (uint i=0; i<currentStakedByUser[msg.sender].length; i++){
            if (currentStakedByUser[msg.sender][i] == stakeId) {
                index = i ;
                break;
            }
        }
        currentStakedByUser[msg.sender][index] = currentStakedByUser[msg.sender][currentStakedByUser[msg.sender].length - 1];
        delete currentStakedByUser[msg.sender][currentStakedByUser[msg.sender].length - 1];
        currentStakedByUser[msg.sender].pop();

        emit Redeem(stakeId, s.finalAmount);
    }

    function updateVariables(uint256 secondsF, uint256 minimum) public onlyOwner {
        secondsInFuture = secondsF ;
        minimumValue = minimum ;
    }

    event Staked(address indexed user, uint256 stakeId, uint256 value);

    event StakeEnded(uint256 stakeId, uint256 finalAmount);

    event Redeem(uint256 stakeId, uint256 finalAmount);
}