//
//  MicViewViewController.m
//  QueUp
//
//  Created by Cheng Tian on 5/31/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "MicViewViewController.h"
#import "AppDelegate.h"


@interface MicViewViewController ()
{
    id<SINClient> _client;
    id<SINCall> _call;
}
@end


@implementation MicViewViewController
@synthesize callButton;


-(void)initSinchClient
{
      _client = [Sinch clientWithApplicationKey:@"dff6bf13-c7a3-4842-8a68-e4d34ecbc4da"
                            applicationSecret:@"ERG90kpgEEShyfV08XHSSw=="
                              environmentHost:@"sandbox.sinch.com"
                                       userId:@"phonecaller"];
    _client.callClient.delegate = self;
    [_client setSupportCalling:YES];
    [_client start];
    [_client startListeningOnActiveConnection];
    
    
}
- (void)viewDidLoad {
    [super viewDidLoad];
    [self initSinchClient];
    // Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


- (IBAction)call:(id)sender {
    
    NSLog(@"***** trying to call *****");
    
    NSLog(@"***** in here *****");
    
    _call = [_client.callClient callUserWithId:@"<test>"];
    
    
    //        _call = [[_client callClient] callPhoneNumber:phoneNumber.text];
    
    //         _call = [[_client callClient] callUserWithId:@"<test>"];
    //
    //        [callButton setTitle:@"Hangup" forState:UIControlStateNormal];
    
}

- (IBAction)back:(id)sender {
}
@end
