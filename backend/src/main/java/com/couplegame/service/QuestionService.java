package com.couplegame.service;
import com.couplegame.model.Question;
import com.couplegame.repository.QuestionRepository;
import org.springframework.stereotype.Service;
import java.util.*;
@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    public QuestionService(QuestionRepository questionRepository) { this.questionRepository = questionRepository; }
    public Question getRandomQuestion(Question.QuestionType type, Integer level, String category) {
        List<Question> all = questionRepository.findAll();
        List<Question> filtered = new ArrayList<>();
        for (Question q : all) {
            if (q.getType() != type) continue;
            if (level != null && !level.equals(q.getLevel())) continue;
            if (category != null && !category.isEmpty() && !category.equals(q.getCategory())) continue;
            filtered.add(q);
        }
        if (filtered.isEmpty()) throw new RuntimeException("No " + type.name().toLowerCase() + " questions found for Level " + (level != null ? level : "any") + " + Category " + (category != null && !category.isEmpty() ? category : "any") + ". Try different filters.");
        Collections.shuffle(filtered);
        return filtered.get(0);
    }
    public Question getRandomQuestion(Question.QuestionType type) { return getRandomQuestion(type, null, null); }
    public Map<String, Question> getRandomPair(Integer level, String category) {
        Map<String, Question> result = new HashMap<>();
        try { result.put("truth", getRandomQuestion(Question.QuestionType.TRUTH, level, category)); } catch (RuntimeException e) {}
        try { result.put("dare", getRandomQuestion(Question.QuestionType.DARE, level, category)); } catch (RuntimeException e) {}
        if (result.isEmpty()) throw new RuntimeException("No questions found for selected filters");
        return result;
    }
    public Map<String, Question> getRandomPair() { return getRandomPair(null, null); }
    public List<String> getCategories(Question.QuestionType type) { return questionRepository.findCategoriesByType(type); }
    public void initDefaultQuestions() {
        if (!questionRepository.findAll().isEmpty()) return;
        String[][] truths = {
            {"TRUTH","你第一次心动的感觉是在什么时候？","1","情感"},
            {"TRUTH","你最看重伴侣的哪三个品质？","1","情感"},
            {"TRUTH","你上一次哭是因为什么？","1","情感"},
            {"TRUTH","有没有对伴侣隐瞒过什么事情？","2","情感"},
            {"TRUTH","你在感情中最害怕失去什么？","2","情感"},
            {"TRUTH","如果重新选择，你还会和现在的伴侣在一起吗？","3","情感"},
            {"TRUTH","你在恋爱期间对别人动过心吗？","3","情感"},
            {"TRUTH","伴侣对你说过最伤人的一句话是什么？","2","情感"},
            {"TRUTH","你相信一见钟情吗？","1","情感"},
            {"TRUTH","你最想和伴侣一起去哪里旅行？","1","生活"},
            {"TRUTH","最希望伴侣改掉的一个习惯是什么？","2","生活"},
            {"TRUTH","你觉得自己最坏的生活习惯是什么？","1","生活"},
            {"TRUTH","你现在有多少存款？","3","生活"},
            {"TRUTH","你对父母撒过最大的谎是什么？","2","生活"},
            {"TRUTH","你最尴尬的一次经历是什么？","1","生活"},
            {"TRUTH","你考试作过弊吗？","2","生活"},
            {"TRUTH","你做过最糟糕的决定是什么？","3","生活"},
            {"TRUTH","你在什么东西上花钱最多？","1","生活"},
            {"TRUTH","你在感情中最大的缺点是什么？","2","自我"},
            {"TRUTH","最想改变自己的哪一点？","1","自我"},
            {"TRUTH","你最大的不安全感来自哪里？","3","自我"},
            {"TRUTH","你最引以为豪的成就是什么？","1","自我"},
            {"TRUTH","你最希望自己擅长什么？","1","自我"},
            {"TRUTH","你做过心理咨询吗？为什么？","3","自我"},
            {"TRUTH","生活教会你最深刻的一课是什么？","2","自我"},
            {"TRUTH","你觉得自己是个好人吗？为什么？","2","自我"},
            {"TRUTH","你人生中最大的遗憾是什么？","3","自我"},
            {"TRUTH","你做过最浪漫的事是什么？","1","浪漫"},
            {"TRUTH","你理想的约会是什么样的？","1","浪漫"},
            {"TRUTH","别人为你做过最浪漫的事是什么？","1","浪漫"},
            {"TRUTH","你更喜欢轰轰烈烈的表白还是细水长流的陪伴？","2","浪漫"},
            {"TRUTH","你收到过伴侣送的最好的礼物是什么？","2","浪漫"},
            {"TRUTH","你去过最浪漫的地方是哪里？","1","浪漫"},
            {"TRUTH","你写过情书吗？","2","浪漫"},
            {"TRUTH","哪首歌会让你联想到爱情？","1","浪漫"},
            {"TRUTH","如果办一场梦幻婚礼，你希望是什么样子的？","2","浪漫"},
            {"TRUTH","你最快乐的童年回忆是什么？","1","过去"},
            {"TRUTH","你的初恋是谁？","1","过去"},
            {"TRUTH","你经历过最糟糕的约会是什么样的？","2","过去"},
            {"TRUTH","你偷过东西吗？","3","过去"},
            {"TRUTH","你在过去恋情中犯过最大的错误是什么？","2","过去"},
            {"TRUTH","你有一个从未告诉过任何人的秘密吗？","3","过去"},
            {"TRUTH","你小时候相信过最傻的事是什么？","1","过去"},
            {"TRUTH","你打过架吗？","3","过去"},
            {"TRUTH","你青春期做过最叛逆的事是什么？","2","过去"},
            {"TRUTH","你希望十年后的自己是什么样子？","1","未来"},
            {"TRUTH","你想要孩子吗？想要几个？","2","未来"},
            {"TRUTH","你的人生愿望清单上有什么？","1","未来"},
            {"TRUTH","如果可以住在世界上任何地方，你会选哪里？","1","未来"},
            {"TRUTH","你小时候梦想的职业是什么？","1","未来"},
            {"TRUTH","你对未来最大的恐惧是什么？","2","未来"},
            {"TRUTH","你宁愿有钱但不快乐，还是没钱但快乐？","2","未来"},
            {"TRUTH","如果生命只剩一年，你会做什么？","3","未来"},
            {"TRUTH","你希望留下什么样的遗产给这个世界？","3","未来"}
        };
        String[][] dares = {
            {"DARE","给对方唱一首情歌（至少30秒）","1","表演"},
            {"DARE","模仿对方说话的语气说一段情话","1","表演"},
            {"DARE","用三种语言说我爱你","1","表演"},
            {"DARE","模仿一个明星让对方猜","1","表演"},
            {"DARE","用夸张的情绪朗读一首情诗","2","表演"},
            {"DARE","跳一段30秒的舞蹈，歌曲由对方选","2","表演"},
            {"DARE","用说唱的方式讲出你们怎么认识的","2","表演"},
            {"DARE","表演一段爱情电影的经典场景","2","表演"},
            {"DARE","声情并茂地唱一首国歌","3","表演"},
            {"DARE","用嘴喂对方吃一样食物","2","亲密"},
            {"DARE","给对方做3分钟肩颈按摩","1","亲密"},
            {"DARE","在对方耳边说一句悄悄话","1","亲密"},
            {"DARE","在没有音乐的情况下和对方慢舞1分钟","1","亲密"},
            {"DARE","连续亲吻对方30秒不停","2","亲密"},
            {"DARE","给对方做一次足底按摩","1","亲密"},
            {"DARE","在对方背上写我爱你让对方猜","2","亲密"},
            {"DARE","蒙住对方的眼睛喂TA吃一样甜食","2","亲密"},
            {"DARE","脱掉一件衣服","3","亲密"},
            {"DARE","公主抱对方绕房间走一圈","2","动作"},
            {"DARE","让对方坐在背上做10个俯卧撑","2","动作"},
            {"DARE","一边唱歌一边做20个开合跳","1","动作"},
            {"DARE","平板支撑坚持尽可能长的时间","1","动作"},
            {"DARE","靠墙倒立10秒钟","2","动作"},
            {"DARE","四肢着地和对方比赛谁先跑到房间另一头","1","动作"},
            {"DARE","头顶一本书走过整个房间","1","动作"},
            {"DARE","握着对方的手做15个深蹲","2","动作"},
            {"DARE","原地转10圈然后走直线","1","动作"},
            {"DARE","发一条让对方指定的朋友圈","3","整蛊"},
            {"DARE","给通讯录第三个人打电话说我想你了","3","整蛊"},
            {"DARE","在接下来三轮游戏中使用外国口音说话","1","整蛊"},
            {"DARE","现在就给你的好朋友发一张鬼脸自拍","2","整蛊"},
            {"DARE","把衣服反着穿直到游戏结束","1","整蛊"},
            {"DARE","给父母发一条我爱你加搞笑表情","2","整蛊"},
            {"DARE","用慢动作走过房间","1","整蛊"},
            {"DARE","接下来两分钟说话不许动嘴唇","2","整蛊"},
            {"DARE","让对方在你的社交媒体上发任何内容","3","整蛊"},
            {"DARE","用1分钟画一张对方的肖像","1","创意"},
            {"DARE","写一首关于对方的短诗并念出来","2","创意"},
            {"DARE","即兴编一首关于你们的歌并唱出来","2","创意"},
            {"DARE","创造一个只有你们俩知道的秘密握手动作","1","创意"},
            {"DARE","用手边的东西搭一个小雕塑","1","创意"},
            {"DARE","即兴讲一个1分钟的童话故事主角是对方","2","创意"},
            {"DARE","用5个词加一个动作描述对方","1","创意"},
            {"DARE","发明一个新词来描述你们的关系","2","创意"},
            {"DARE","为对方创作并表演一段30秒的广告","2","创意"},
            {"DARE","和对方对视30秒不许笑","1","社交"},
            {"DARE","给房间里的每一个人一句真诚的赞美","1","社交"},
            {"DARE","讲一个笑话并在10秒内把对方逗笑","1","社交"},
            {"DARE","重现你们第一次对话的场景","2","社交"},
            {"DARE","给对方看你手机里最尴尬的一张照片","3","社交"},
            {"DARE","打电话给一个朋友并告诉TA你爱伴侣的一件事","2","社交"},
            {"DARE","说一句关于前任的好话","3","社交"},
            {"DARE","模仿对方生气的样子","1","社交"},
            {"DARE","录一段15秒的视频留言送给对方保存","2","社交"}
        };
        List<Question> list = new ArrayList<>();
        for (String[] t : truths) { Question q = new Question(); q.setType(Question.QuestionType.TRUTH); q.setContent(t[1]); q.setLevel(Integer.parseInt(t[2])); q.setCategory(t[3]); list.add(q); }
        for (String[] d : dares) { Question q = new Question(); q.setType(Question.QuestionType.DARE); q.setContent(d[1]); q.setLevel(Integer.parseInt(d[2])); q.setCategory(d[3]); list.add(q); }
        questionRepository.saveAll(list);
    }
}
