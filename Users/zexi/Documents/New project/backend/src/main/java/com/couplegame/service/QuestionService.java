package com.couplegame.service;

import com.couplegame.model.Question;
import com.couplegame.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    public Question getRandomQuestion(Question.QuestionType type) {
        List<Question> questions = questionRepository.findRandomByType(type, 1);
        if (questions.isEmpty()) {
            throw new RuntimeException("暂无题目");
        }
        return questions.get(0);
    }

    public Map<String, Question> getRandomPair() {
        Map<String, Question> result = new HashMap<>();
        result.put("truth", getRandomQuestion(Question.QuestionType.TRUTH));
        result.put("dare", getRandomQuestion(Question.QuestionType.DARE));
        return result;
    }

    public long count() {
        return questionRepository.count();
    }

    public void initDefaultQuestions() {
        if (questionRepository.count() > 0) return;

        List<Question> truths = List.of(
            q("TRUTH", "你第一次心动的感觉是在什么时候？", 1, "情感"),
            q("TRUTH", "你最想和对方一起去的旅行目的地是哪里？", 1, "生活"),
            q("TRUTH", "你最看重伴侣的哪三个品质？", 1, "情感"),
            q("TRUTH", "有没有对对方隐瞒过什么事情？", 2, "情感"),
            q("TRUTH", "你觉得自己在感情中最大的缺点是什么？", 2, "自我"),
            q("TRUTH", "你最希望对方改掉的一个习惯是什么？", 2, "生活"),
            q("TRUTH", "你上一次哭是因为什么？", 1, "情感"),
            q("TRUTH", "如果让你重新选择，你还会和现在的伴侣在一起吗？", 3, "情感"),
            q("TRUTH", "你做过最浪漫的事是什么？", 1, "浪漫"),
            q("TRUTH", "你在感情中最害怕失去什么？", 2, "情感"),
            q("TRUTH", "你有过精神出轨的念头吗？", 3, "情感"),
            q("TRUTH", "对方说过的哪句话最让你感动？", 1, "浪漫"),
            q("TRUTH", "你最喜欢对方身体的哪个部位？", 2, "亲密"),
            q("TRUTH", "你最想改变自己的哪个方面？", 1, "自我"),
            q("TRUTH", "你觉得一段好的感情最重要的是什么？", 1, "情感"),
            q("TRUTH", "你和前任还有联系吗？", 3, "情感"),
            q("TRUTH", "你对现在的感情满意吗？打几分？", 2, "情感"),
            q("TRUTH", "你有想过去整容或医美吗？", 2, "自我"),
            q("TRUTH", "你最想和TA一起完成的事是什么？", 1, "浪漫"),
            q("TRUTH", "你觉得自己是恋爱脑吗？", 1, "自我")
        );

        List<Question> dares = List.of(
            q("DARE", "模仿对方说话的语气，说一段表白的话", 1, "表演"),
            q("DARE", "给对方唱一首情歌（至少30秒）", 1, "表演"),
            q("DARE", "用嘴喂对方吃一样食物", 2, "亲密"),
            q("DARE", "公主抱对方绕房间走一圈", 2, "动作"),
            q("DARE", "发一条社死朋友圈（对方指定内容）", 3, "整蛊"),
            q("DARE", "和对方对视30秒不准笑", 1, "互动"),
            q("DARE", "给通讯录第三个人打电话说\"我想你了\"", 3, "整蛊"),
            q("DARE", "用三种语言说\"我爱你\"", 1, "表演"),
            q("DARE", "给对方做一个3分钟的肩颈按摩", 1, "亲密"),
            q("DARE", "模仿一个动物让对方猜", 1, "表演"),
            q("DARE", "说出对方10个优点，不能停顿", 1, "互动"),
            q("DARE", "把对方壁咚在墙上，深情对视10秒", 2, "亲密"),
            q("DARE", "闭着眼睛让对方带你走一段路", 2, "互动"),
            q("DARE", "用撒娇的语气朗读一段新闻", 2, "表演"),
            q("DARE", "给对方写一首情诗并念出来", 2, "浪漫"),
            q("DARE", "跳一支10秒钟的舞蹈", 1, "表演"),
            q("DARE", "做10个俯卧撑，对方可以坐在背上", 2, "动作"),
            q("DARE", "模仿你最喜欢的明星说话", 1, "表演"),
            q("DARE", "用方言说一段绕口令", 1, "表演"),
            q("DARE", "双手抱起对方的头，深情对望说\"我喜欢你\"", 2, "亲密")
        );

        questionRepository.saveAll(truths);
        questionRepository.saveAll(dares);
    }

    private Question q(String type, String content, int level, String category) {
        return Question.builder()
            .type(Question.QuestionType.valueOf(type))
            .content(content)
            .level(level)
            .category(category)
            .build();
    }
}
